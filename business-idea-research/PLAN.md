# Business Idea Research Plan

This folder stores the ongoing research workflow for finding viable businesses around network engineering, homelab, SDN, wireless and satellite communications, off-grid solar, and battery storage.

## Current Priority Business

**Nonaym.ai** — privacy-focused DNS appliance brand.

- **Domain:** nonaym.ai (registered)
- **Brand concept:** "Jane Doe" / anti-Elmo — privacy-first, no-tracking, consumer-friendly but no-nonsense
- **Product line:**
  - **Nonaym Lite** ($80-150 OEM): Technitium DNS + blocklists + dashboard + health checks. Target hardware: Intel N100/N150, 8-16GB RAM, 128-256GB SSD, dual LAN.
  - **Nonaym AI** ($250-500): All Lite features + ClamAV + Ollama local LLM + device behavior summaries. Target hardware: Ryzen i5/i7, 16-32GB RAM, 512GB SSD.
- **Dashboard display:** Runs on user's TV via HDMI out — TV is the display, box is the engine
- **Revenue model:** Hardware sale ($80-500) + optional $5/mo managed protection (ad/malware blocklist updates, remote health)
- **Competitive edge:** First DNS-first + malware scanning + local AI insights appliance. No cloud dependency.
- **Closest competitors:** Firewalla Purple SE ($79-129), MakerBright AdGuard appliance ($74.99, out of stock), UniFi CyberSecure ($99/yr cloud)
- **Status:** Research phase — hardware sourcing in progress
- **Next step:** Source Dell OptiPlex Micro lots or Beelink/MSI units at market price (~$40-60/unit for Dell lots); build first prototype

*The research pipeline (collector.py) continues to track broader market signals for secondary opportunities.*

## Workflow
1. Run curl with redirects and store raw search captures.
2. Supplement with Google News RSS search captures for broader article coverage.
3. Parse titles, links, snippets, domains, and dates into SQLite.
4. Produce a daily top-five report.
5. Use the report as input for a living business plan with Mark.

## Ongoing Research (secondary signals)

The collector pipeline continues scanning for complementary opportunities. Current secondary candidates:
- Off-grid solar + battery telecom (highest secondary signal, ~1700 pts)
- Wireless/satellite rural connectivity
- SDN & network automation consulting

### DDG seed query
- network engineering homelab software-defined networking wireless satellite communications off-grid solar battery storage business

### News queries
- network engineering consulting business
- homelab training course network automation
- software defined networking managed services
- private 5g rural wireless business
- starlink solar battery storage business
- off-grid telecom solar battery systems
- satellite terrestrial network orchestration
- nonaym.ai DNS appliance market competition
