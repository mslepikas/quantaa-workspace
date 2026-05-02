#!/usr/bin/env python3
from __future__ import annotations

import html
import json
import re
import sqlite3
import subprocess
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable
from urllib.parse import parse_qs, quote_plus, unquote, urlparse

ROOT = Path(__file__).resolve().parent
RAW_DIR = ROOT / "raw"
REPORTS_DIR = ROOT / "reports"
DB_PATH = ROOT / "research.db"
PLAN_PATH = ROOT / "PLAN.md"

DDG_QUERIES = [
    "network engineering homelab software-defined networking wireless satellite communications off-grid solar battery storage business"
]

NEWS_QUERIES = [
    "network engineering consulting business",
    "homelab training course network automation",
    "software defined networking managed services",
    "private 5g rural wireless business",
    "starlink solar battery storage business",
    "off-grid telecom solar battery systems",
    "satellite terrestrial network orchestration",
]

THEMES = {
    "homelab_training": {
        "label": "Homelab education, content, and paid training",
        "keywords": ["homelab", "training", "course", "lab", "network automation", "youtube", "guide"],
    },
    "sdn_consulting": {
        "label": "SDN and network automation consulting",
        "keywords": ["sdn", "software defined networking", "automation", "managed services", "orchestration"],
    },
    "wireless_satellite": {
        "label": "Wireless, satellite, and rural connectivity services",
        "keywords": ["satellite", "wireless", "starlink", "private 5g", "rural", "backhaul"],
    },
    "offgrid_power": {
        "label": "Off-grid solar and battery-backed telecom solutions",
        "keywords": ["solar", "battery", "off-grid", "storage", "telecom", "tower", "remote site", "vsat"],
    },
    "edge_appliance": {
        "label": "GB10-based edge AI monitoring appliance business",
        "keywords": ["edge", "telemetry", "monitoring", "remote control", "infrastructure", "network engineer"],
    },
}

@dataclass
class Result:
    source_platform: str
    query: str
    title: str
    url: str
    snippet: str
    domain: str
    published_at: str | None
    fetched_at: str
    raw_path: str


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:100]


def ensure_dirs() -> None:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)


def ensure_column(conn: sqlite3.Connection, table: str, column: str, definition: str) -> None:
    existing = {row[1] for row in conn.execute(f"PRAGMA table_info({table})")}
    if column not in existing:
        conn.execute(f"ALTER TABLE {table} ADD COLUMN {column} {definition}")
        conn.commit()


def init_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS search_runs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            query TEXT NOT NULL,
            fetched_at TEXT NOT NULL,
            raw_path TEXT NOT NULL,
            source_platform TEXT DEFAULT 'unknown'
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL UNIQUE,
            title TEXT NOT NULL,
            snippet TEXT NOT NULL,
            domain TEXT NOT NULL,
            first_seen TEXT NOT NULL,
            last_seen TEXT NOT NULL,
            first_query TEXT NOT NULL,
            last_query TEXT NOT NULL,
            raw_path TEXT NOT NULL,
            source_platform TEXT DEFAULT 'unknown',
            published_at TEXT
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS daily_report_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            report_date TEXT NOT NULL,
            rank INTEGER NOT NULL,
            theme_key TEXT NOT NULL,
            theme_label TEXT NOT NULL,
            rationale TEXT NOT NULL,
            sample_urls_json TEXT NOT NULL
        )
        """
    )
    ensure_column(conn, "search_runs", "source_platform", "TEXT DEFAULT 'unknown'")
    ensure_column(conn, "results", "source_platform", "TEXT DEFAULT 'unknown'")
    ensure_column(conn, "results", "published_at", "TEXT")
    conn.commit()
    return conn


def curl_to_file(url: str, output_path: Path) -> None:
    subprocess.run(
        ["curl", "-L", url, "--user-agent", "Mozilla/5.0", "-o", str(output_path)],
        check=True,
        capture_output=True,
        text=True,
    )


def fetch_ddg_query(query: str, date_prefix: str) -> tuple[str, Path]:
    filename = f"{date_prefix}-ddg-{slugify(query)}.html"
    raw_path = RAW_DIR / filename
    url = f"https://html.duckduckgo.com/html/?q={quote_plus(query)}"
    curl_to_file(url, raw_path)
    return raw_path.read_text(errors="ignore"), raw_path


def fetch_news_query(query: str, date_prefix: str) -> tuple[str, Path]:
    filename = f"{date_prefix}-news-{slugify(query)}.xml"
    raw_path = RAW_DIR / filename
    url = (
        f"https://news.google.com/rss/search?q={quote_plus(query)}"
        "&hl=en-US&gl=US&ceid=US:en"
    )
    curl_to_file(url, raw_path)
    return raw_path.read_text(errors="ignore"), raw_path


def clean_text(value: str) -> str:
    value = html.unescape(value or "")
    value = re.sub(r"<.*?>", "", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def decode_result_url(href: str) -> str:
    href = html.unescape(href)
    if "uddg=" in href:
        query = parse_qs(urlparse(href).query)
        return unquote(query.get("uddg", [href])[0])
    if href.startswith("//"):
        return "https:" + href
    return href


def parse_ddg_results(query: str, fetched_at: str, raw_path: Path, raw_html: str) -> list[Result]:
    if "anomaly-modal" in raw_html:
        return []
    pattern = re.compile(
        r'<a rel="nofollow" class="result__a" href="([^"]+)">(.*?)</a>.*?<a class="result__snippet".*?>(.*?)</a>',
        re.S,
    )
    found: list[Result] = []
    for href, title, snippet in pattern.findall(raw_html):
        url = decode_result_url(href)
        domain = urlparse(url).netloc.lower()
        if not url or not domain:
            continue
        found.append(
            Result(
                source_platform="duckduckgo-html",
                query=query,
                title=clean_text(title),
                url=url,
                snippet=clean_text(snippet),
                domain=domain,
                published_at=None,
                fetched_at=fetched_at,
                raw_path=str(raw_path),
            )
        )
    return found


def parse_news_results(query: str, fetched_at: str, raw_path: Path, raw_xml: str) -> list[Result]:
    try:
        root = ET.fromstring(raw_xml)
    except ET.ParseError:
        return []
    found: list[Result] = []
    for item in root.findall("./channel/item"):
        title = clean_text(item.findtext("title", default=""))
        link = clean_text(item.findtext("link", default=""))
        description = clean_text(item.findtext("description", default=""))
        source = clean_text(item.findtext("source", default=""))
        pub_date = clean_text(item.findtext("pubDate", default="")) or None
        domain = urlparse(link).netloc.lower() or source.lower().replace(" ", "-")
        snippet = description
        if not title or not link:
            continue
        found.append(
            Result(
                source_platform="google-news-rss",
                query=query,
                title=title,
                url=link,
                snippet=snippet,
                domain=domain,
                published_at=pub_date,
                fetched_at=fetched_at,
                raw_path=str(raw_path),
            )
        )
    return found


def save_run(conn: sqlite3.Connection, query: str, fetched_at: str, raw_path: Path, source_platform: str, results: Iterable[Result]) -> None:
    conn.execute(
        "INSERT INTO search_runs (query, fetched_at, raw_path, source_platform) VALUES (?, ?, ?, ?)",
        (query, fetched_at, str(raw_path), source_platform),
    )
    for result in results:
        conn.execute(
            """
            INSERT INTO results (url, title, snippet, domain, first_seen, last_seen, first_query, last_query, raw_path, source_platform, published_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(url) DO UPDATE SET
                title=excluded.title,
                snippet=excluded.snippet,
                domain=excluded.domain,
                last_seen=excluded.last_seen,
                last_query=excluded.last_query,
                raw_path=excluded.raw_path,
                source_platform=excluded.source_platform,
                published_at=COALESCE(excluded.published_at, results.published_at)
            """,
            (
                result.url,
                result.title,
                result.snippet,
                result.domain,
                result.fetched_at,
                result.fetched_at,
                result.query,
                result.query,
                result.raw_path,
                result.source_platform,
                result.published_at,
            ),
        )
    conn.commit()


def score_theme(rows: list[sqlite3.Row], keywords: list[str]) -> tuple[int, list[sqlite3.Row]]:
    scored = []
    total = 0
    for row in rows:
        haystack = f"{row['title']} {row['snippet']} {row['last_query']}".lower()
        score = sum(1 for keyword in keywords if keyword.lower() in haystack)
        if score:
            total += score
            scored.append((score, row))
    scored.sort(key=lambda item: (-item[0], item[1]["last_seen"], item[1]["title"]))
    picks = []
    seen_urls = set()
    for _, row in scored:
        if row["url"] in seen_urls:
            continue
        seen_urls.add(row["url"])
        picks.append(row)
        if len(picks) >= 3:
            break
    return total, picks


def build_report(conn: sqlite3.Connection, report_date: str) -> Path:
    conn.row_factory = sqlite3.Row
    rows = conn.execute(
        "SELECT * FROM results ORDER BY last_seen DESC, id DESC"
    ).fetchall()
    ranked = []
    for theme_key, payload in THEMES.items():
        score, picks = score_theme(rows, payload["keywords"])
        if score and picks:
            ranked.append((score, theme_key, payload["label"], picks))
    ranked.sort(key=lambda item: (-item[0], item[2]))
    top_five = ranked[:5]

    conn.execute("DELETE FROM daily_report_items WHERE report_date = ?", (report_date,))
    for rank, (_, theme_key, label, picks) in enumerate(top_five, start=1):
        rationale = "; ".join(pick["title"] for pick in picks[:2])
        conn.execute(
            "INSERT INTO daily_report_items (report_date, rank, theme_key, theme_label, rationale, sample_urls_json) VALUES (?, ?, ?, ?, ?, ?)",
            (report_date, rank, theme_key, label, rationale, json.dumps([row["url"] for row in picks])),
        )
    conn.commit()

    ddg_captures = conn.execute(
        "SELECT COUNT(*) FROM search_runs WHERE source_platform='duckduckgo-html'"
    ).fetchone()[0]
    news_captures = conn.execute(
        "SELECT COUNT(*) FROM search_runs WHERE source_platform='google-news-rss'"
    ).fetchone()[0]
    unique_urls = conn.execute("SELECT COUNT(*) FROM results").fetchone()[0]

    report_path = REPORTS_DIR / f"{report_date}.md"
    lines = [
        f"# Daily Business Idea Report - {report_date}",
        "",
        "## Goal",
        "Track article-driven signals for business opportunities tied to Mark's interests and hardware.",
        "",
        "## Coverage today",
        f"- DDG raw captures: {ddg_captures}",
        f"- Google News RSS captures: {news_captures}",
        f"- Unique tracked result URLs: {unique_urls}",
        "",
        "## Top 5 business directions today",
        "",
    ]
    for rank, (score, theme_key, label, picks) in enumerate(top_five, start=1):
        lines.append(f"### {rank}. {label}")
        lines.append(f"- Signal strength: {score}")
        for pick in picks:
            lines.append(f"- {pick['title']}")
            lines.append(f"  - Source: {pick['source_platform']} | Domain: {pick['domain']}")
            if pick['published_at']:
                lines.append(f"  - Published: {pick['published_at']}")
            lines.append(f"  - {pick['snippet']}")
            lines.append(f"  - {pick['url']}")
        lines.append("")

    lines.extend([
        "## Business-plan angle",
        "- Start with service or training revenue first when possible.",
        "- Use the GB10 as a demo lab, monitoring appliance, or content workstation.",
        "- Prefer ideas that combine Mark's technical credibility with recurring revenue.",
        "",
        "## Next refinement questions",
        "- Which of these can be sold locally first?",
        "- Which can become recurring monthly revenue instead of one-off installs?",
        "- Which needs the least upfront inventory?",
        "",
        "## Storage",
        "- Raw captures live in `raw/`.",
        "- Structured results live in `research.db`.",
    ])
    report_path.write_text("\n".join(lines) + "\n")
    return report_path


def write_plan() -> None:
    PLAN_PATH.write_text(
        "# Business Idea Research Plan\n\n"
        "This folder stores the ongoing research workflow for finding viable businesses around network engineering, homelab, SDN, wireless and satellite communications, off-grid solar, and battery storage.\n\n"
        "## Workflow\n"
        "1. Run curl with redirects and store raw search captures.\n"
        "2. Supplement with Google News RSS search captures for broader article coverage.\n"
        "3. Parse titles, links, snippets, domains, and dates into SQLite.\n"
        "4. Produce a daily top-five report.\n"
        "5. Use the report as input for a living business plan with Mark.\n\n"
        "## DDG seed query\n"
        + "\n".join(f"- {query}" for query in DDG_QUERIES)
        + "\n\n## News queries\n"
        + "\n".join(f"- {query}" for query in NEWS_QUERIES)
        + "\n"
    )


def main() -> None:
    ensure_dirs()
    write_plan()
    conn = init_db()
    now = datetime.now().astimezone()
    fetched_at = now.isoformat(timespec="seconds")
    date_prefix = now.strftime("%Y-%m-%d")
    total_results = 0

    for query in DDG_QUERIES:
        raw_html, raw_path = fetch_ddg_query(query, date_prefix)
        results = parse_ddg_results(query, fetched_at, raw_path, raw_html)
        save_run(conn, query, fetched_at, raw_path, "duckduckgo-html", results)
        total_results += len(results)

    for query in NEWS_QUERIES:
        raw_xml, raw_path = fetch_news_query(query, date_prefix)
        results = parse_news_results(query, fetched_at, raw_path, raw_xml)
        save_run(conn, query, fetched_at, raw_path, "google-news-rss", results)
        total_results += len(results)

    report_path = build_report(conn, date_prefix)
    summary = {
        "ran_at": fetched_at,
        "ddg_queries": len(DDG_QUERIES),
        "news_queries": len(NEWS_QUERIES),
        "results_seen_this_run": total_results,
        "report_path": str(report_path),
        "db_path": str(DB_PATH),
    }
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
