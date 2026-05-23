# Phase 10M — Nonaym DIY Installer Planning Gate

Date: 2026-05-23

## Purpose

Define the safety, design, and approval gate for a future install-capable Nonaym DIY package.

This phase does not build an installer.

This phase exists because Phase 10D through Phase 10L proved that the read-only preflight path works across:

- Raspberry Pi 5 / ARM64
- Protectli / x86_64
- Generic Intel / x86_64
- Lenovo #1 / x86_64
- Lenovo #2 / x86_64

Before any install-capable script or image is created, Nonaym must define exactly what the installer is allowed to do and what requires explicit human confirmation.

## Current Verified State

The current public package is read-only.

Verified public package:

https://nonaym.ai/download/files/nonaym-diy-preflight-phase10k.tar.gz

Verified script version:

phase10j-v2.1

Verified behavior:

- downloads from nonaym.ai
- checksum verifies
- extracts successfully
- runs without root
- creates a local report
- provides PASS / CAUTION / FAIL
- does not install packages
- does not modify disks
- does not change DNS
- does not change networking
- does not start services

## Tested Hardware Summary

| Phase | Device | Architecture | Result |
|------|--------|--------------|--------|
| 10D | Raspberry Pi 5 / UnifiPi | ARM64 / aarch64 | PASS |
| 10E | Protectli / ns2quantaa | x86_64 | PASS after architecture fix |
| 10F | Generic Intel / nonaym1 | x86_64 | PASS after architecture fix |
| 10G | Lenovo #1 / nonaym5 | x86_64 | PASS |
| 10H | Lenovo #2 / nonaym4 | x86_64 | PASS |
| 10K | Public package on nonaym4 | x86_64 | PASS |
| 10L | Public package on Raspberry Pi | ARM64 / aarch64 | PASS |

## Installer Gate Decision

A real installer is not approved yet.

Phase 10M only approves planning.

A future install-capable phase must be separately reviewed and approved before implementation.

## Installer Safety Principles

The future installer must be designed around these principles:

1. Preflight first
2. No install without explicit confirmation
3. No disk formatting without explicit confirmation
4. No automatic router/DNS changes
5. No silent service changes
6. No collecting private network data for upload
7. No customer data upload by default
8. Clear rollback guidance
9. Clear install log
10. Separate test mode from install mode

## Required Installer Modes

A future installer should support at least three modes.

### Mode 1 — Preflight Only

Purpose:

Run inventory and compatibility checks only.

Allowed:

- read hardware information
- read OS information
- read disk capacity
- read network adapter inventory
- create local report

Not allowed:

- package installation
- Docker installation
- Technitium installation
- disk formatting
- DNS changes
- network changes
- firewall changes
- service starts/stops

Current Phase 10J v2.1 already satisfies this mode.

### Mode 2 — Dry Run

Purpose:

Show exactly what the installer would do without doing it.

Allowed:

- print install plan
- list packages that would be installed
- list directories that would be created
- list Docker commands that would be run
- list ports that would be used
- list confirmation prompts

Not allowed:

- installing packages
- modifying disks
- starting services
- changing DNS
- changing network settings

### Mode 3 — Guided Install

Purpose:

Perform installation only after explicit confirmation.

Allowed only after confirmation:

- install required OS packages
- create Nonaym directories
- install or configure Docker
- place docker-compose.yml
- pull Technitium image
- create local config/log directories
- start Technitium container
- generate install report

Not allowed without separate explicit confirmation:

- format or repartition disks
- overwrite existing DNS server config
- change router DHCP/DNS settings
- expose dashboard publicly
- open firewall to WAN
- upload inventory to cloud
- collect customer private data

## Required Confirmation Gates

The installer must include explicit typed confirmations.

### Confirmation 1 — Continue Past Preflight

Required phrase:

CONTINUE NONAYM INSTALL

Purpose:

Move from preflight/dry-run to install preparation.

### Confirmation 2 — Install Packages

Required phrase:

INSTALL NONAYM PACKAGES

Purpose:

Allow package installation such as Docker dependencies.

### Confirmation 3 — Start DNS Service

Required phrase:

START NONAYM DNS

Purpose:

Allow Technitium container/service start.

### Confirmation 4 — Destructive Actions

Required phrase:

I UNDERSTAND THIS MAY ERASE DATA

Purpose:

Required before any disk formatting or repartitioning.

Phase 10M decision:

Destructive disk actions are not approved for the first installer version.

## Installer v1 Scope

Installer v1 should be conservative.

Approved planning direction:

- Debian-based systems first
- x86_64 standard profile first
- Raspberry Pi ARM64 as separate installer path
- Technitium via Docker Compose
- host networking only if reviewed
- local-only dashboard unless explicitly changed
- local reports only
- no cloud upload
- no payment integration
- no customer account integration
- no automatic router modification

## Installer v1 Should Not Include

Installer v1 should not include:

- payment/checkout
- customer dashboard
- R2 customer lead writes
- automatic public exposure
- automatic router login
- automatic ISP router modification
- VPN/Tailscale setup
- AI summarizer
- model downloads
- remote management
- telemetry upload
- destructive disk formatting
- multi-machine orchestration

These may be future phases only.

## Proposed Installer File Layout

Future local install path:

/opt/nonaym/

Suggested layout:

/opt/nonaym/
  docker-compose.yml
  config/
  logs/
  reports/
  backups/
  scripts/

Alternative user-space test layout:

~/nonaym/

Use user-space layout during early tests unless system install is explicitly approved.

## Proposed Docker Compose Direction

Technitium service:

- image: technitium/dns-server
- container name: nonaym-dns
- restart: unless-stopped
- DNS port: 53
- dashboard port: 53443
- config volume
- log volume

Network mode requires review.

Host networking may be simple but should be documented clearly because port 53 conflicts are common.

## Required Pre-Install Checks

Before guided install, the installer must check:

- architecture
- OS family/version
- CPU cores
- RAM
- disk capacity
- free space
- Ethernet availability
- port 53 availability
- port 53443 availability
- Docker installed or not
- existing DNS services
- systemd-resolved status
- NetworkManager status
- firewall status if readable
- whether running as root
- whether target directories already exist

## Port Conflict Checks

Installer must detect if these are in use:

- TCP/UDP 53
- TCP 53443
- any future dashboard port

If port 53 is already in use, installer must stop and explain.

It must not automatically disable system services without confirmation.

## Customer-Facing Requirements Before Installer Release

Before public installer release, Nonaym should have:

- public requirements page
- preflight download page
- checksum verification instructions
- install risk disclaimer
- backup reminder
- privacy/security page links
- support email
- known supported hardware list
- known unsupported hardware list
- clear “do not install on your main work computer unless backed up” warning

## Private Data Rules

The installer must not upload:

- IP addresses
- router details
- serial numbers
- Wi-Fi names
- private network topology
- logs
- hardware report

unless a future explicit opt-in support flow is separately reviewed.

Local reports are allowed.

## Review Gate Before Implementation

Before any install-capable script is written, the following must be reviewed:

- installer plan
- command list
- confirmation prompts
- rollback plan
- target paths
- port behavior
- Docker behavior
- Technitium config behavior
- logging behavior
- privacy impact
- security risks

Danno/security review is required before implementation.

## Phase 10M Decision

Phase 10M result:

PLANNING GATE ONLY

No install-capable package is approved yet.

Approved next work:

- draft installer design
- draft dry-run output
- draft command plan
- draft confirmation prompts
- draft rollback plan

Not approved yet:

- actual install script
- public install image
- disk image
- live Docker/Technitium install automation
- router/DNS automation

## Recommended Next Phase

Phase 10N — Draft Nonaym DIY Installer v1 Design

Purpose:

Create the future installer design document and dry-run command plan.

Still no implementation.
