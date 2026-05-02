# Nonaym.ai - DNS Appliance Development

> **Project:** Nonaym.ai "DNS in a box" appliance
> **Engine:** Technitium DNS Server
> **Status:** Development
> **Created:** 2026-05-02

---

## What is Technitium DNS?

Technitium DNS is an open-source, self-hosted DNS server focused on **privacy and security**. It works out-of-the-box with a web-based dashboard and supports:

- **Both authoritative and recursive DNS** — serve your own zones AND resolve for your network
- **Encrypted DNS protocols** — DNS-over-HTTPS (DoH), DNS-over-TLS (DoT), DNS-over-QUIC (DoQ)
- **Built-in ad/malware blocking** — import or create custom blocklists
- **Web dashboard** — monitoring, logging, stats, zone management
- **Cross-platform** — Linux, Windows, macOS, Raspberry Pi, Docker
- **Local caching** — faster lookups, less bandwidth
- **Network-wide control** — block domains, redirect, create internal zones

### Why It's Perfect for Nonaym.ai
- **Zero cost** — fully open source (GPLv3)
- **No cloud dependency** — all processing on your hardware
- **Low resource footprint** — ~5-10MB RAM idle, very light on CPU
- **Easy to deploy** — one-line installer on Linux
- **Professional features** — comparable to enterprise DNS servers

---

## Nonaym.ai Product Vision

### Core Concept
A privacy-first, plug-and-play DNS appliance for home labs and small businesses.

### Product Tiers (Planned)

| Tier | Target | Features |
|------|--------|----------|
| **Nonaym Lite** | Home users | Technitium DNS + default blocklists + web dashboard |
| **Nonaym Plus** | Small business | Lite + custom zones, advanced logging, backup/restore |
| **Nonaym AI** | Power users | Plus + local AI model, smart blocking, anomaly detection |

### Hardware Targets
- **Primary:** Dual-LAN mini PC (~$50-80, low-power Intel)
- **Secondary:** Raspberry Pi 4/5 (ARM build target)
- **USB stick form:** Firestick-sized for TV-mount

---

## Directory Structure

```
nonaym-dns/
├── config/        # Technitium DNS configuration templates
├── docker/        # Docker Compose files for appliance deployment
├── docs/          # Development docs, specs, research
├── prototype/     # Hardware prototyping notes
├── scripts/       # Setup, backup, and automation scripts
└── blocklists/    # Custom blocklists (hosts, DNSBL feeds)
```

---

## Development Plan

### Phase 1: Foundation
- [ ] Set up Technitium DNS on test hardware
- [ ] Configure blocklists and test
- [ ] Create Docker Compose deployment
- [ ] Write initial config templates

### Phase 2: Appliance
- [ ] Build gold-image prototype on mini PC
- [ ] Create automated setup script
- [ ] Design dashboard branding
- [ ] Test DNS performance/latency

### Phase 3: Features
- [ ] Custom blocklist management
- [ ] Backup/restore automation
- [ ] Health monitoring
- [ ] Setup wizard (first-run web interface)

### Phase 4: AI Layer (Nonaym AI)
- [ ] Local anomaly detection
- [ ] Smart blocklist updates
- [ ] Traffic analysis dashboard

---

## Technitium DNS Installation

### Quick Install (Linux)
```bash
curl -sSL https://download.technitium.com/dns/install.sh | sudo bash
```

### Docker
```bash
docker pull technitium/dns-server:latest
```

### Ports
| Port | Protocol | Purpose |
|------|----------|---------|
| 53 | UDP/TCP | Standard DNS |
| 5380 | HTTP | Web dashboard |
| 53443 | HTTPS | Dashboard + DoH |
| 853 | TCP | DoT |
| 5353 | QUIC | DoQ |

---

## Blocklists

Technitium supports multiple blocklist formats. We'll use:
- **Steven Black's hosts** — comprehensive ad/malware list
- **Firebog** — curated DNS blocklist collection
- **Custom** — Nonaym-specific lists (to be developed)

---

## Notes

- Technitium is built on .NET Core — excellent for cross-platform deployment
- The portable app (~5.4MB) is very lightweight
- All data stays local — no telemetry, no cloud calls
- License: GPLv3 (open source, can modify and redistribute)

---

## Resources

- **Website:** https://technitium.com/dns/
- **Blog:** https://blog.technitium.com/
- **Install Guide:** https://blog.technitium.com/2017/11/running-dns-server-on-ubuntu-linux.html
- **Docker Hub:** https://hub.docker.com/r/technitium/dns-server
- **Issues/Support:** https://discuss.privacyguides.net/t/technitium-dns-server-self-hosted/16600
