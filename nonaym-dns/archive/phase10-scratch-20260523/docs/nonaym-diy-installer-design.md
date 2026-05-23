# Nonaym DIY Installer v1 Design Document

## Overview

This document outlines the design for the Nonaym DIY installer v1, which will be the first installer package for Nonaym DIY. The installer must be designed conservatively and align with the safety principles established in Phase 10M.

## Installation Modes

### Mode 1 - Preflight Only
**Purpose:** Run inventory and compatibility checks only.

**Allowed Actions:**
- Read hardware information
- Read OS information
- Read disk capacity
- Read network adapter inventory
- Create local report

**Disallowed Actions:**
- Package installation
- Docker installation
- Technitium installation
- Disk formatting
- DNS changes
- Network changes
- Firewall changes
- Service starts/stops

### Mode 2 - Dry Run
**Purpose:** Show exactly what the installer would do without doing it.

**Allowed Actions:**
- Print install plan
- List packages that would be installed
- List directories that would be created
- List Docker commands that would be run
- List ports that would be used
- List confirmation prompts

**Disallowed Actions:**
- Installing packages
- Modifying disks
- Starting services
- Changing DNS
- Changing network settings

### Mode 3 - Guided Install
**Purpose:** Perform installation only after explicit confirmation.

**Allowed Actions (after confirmation only):**
- Install required OS packages
- Create Nonaym directories
- Install or configure Docker
- Place docker-compose.yml
- Pull Technitium image
- Create local config/log directories
- Start Technitium container
- Generate install report

**Disallowed Actions (without confirmation):**
- Format or repartition disks
- Overwrite existing DNS server config
- Change router DHCP/DNS settings
- Expose dashboard publicly
- Open firewall to WAN
- Upload inventory to cloud
- Collect customer private data

## Confirmation Gates

### Confirmation 1 - Continue Past Preflight
**Required Phrase:** `CONTINUE NONAYM INSTALL`
**Purpose:** Move from preflight/dry-run to install preparation.

### Confirmation 2 - Install Packages
**Required Phrase:** `INSTALL NONAYM PACKAGES`
**Purpose:** Allow package installation such as Docker dependencies.

### Confirmation 3 - Start DNS Service
**Required Phrase:** `START NONAYM DNS`
**Purpose:** Allow Technitium container/service start.

### Confirmation 4 - Destructive Actions
**Required Phrase:** `I UNDERSTAND THIS MAY ERASE DATA`
**Purpose:** Required before any disk formatting or repartitioning.

> Note: Destructive disk actions are not approved for the first installer version.

## Target Paths

**System Install Path:**
```
/opt/nonaym/
  docker-compose.yml
  config/
  logs/
  reports/
  backups/
  scripts/
```

**User-Space Test Path:**
```
~/nonaym/
```

Use user-space layout during early tests unless system install is explicitly approved.

## Docker Compose Configuration

### Technitium Service Configuration
- Image: `technitium/dns-server`
- Container name: `nonaym-dns`
- Restart policy: `unless-stopped`
- DNS port: `53`
- Dashboard port: `53443`
- Config volume
- Log volume

### Network Mode
- Host networking will be used but requires review.
- Host networking may be simple but should be documented clearly because port 53 conflicts are common.

## Required Pre-Install Checks

Before guided install, the installer must check:
- Architecture
- OS family/version
- CPU cores
- RAM
- Disk capacity
- Free space
- Ethernet availability
- Port 53 availability
- Port 53443 availability
- Docker installed or not
- Existing DNS services
- systemd-resolved status
- NetworkManager status
- Firewall status if readable
- Whether running as root
- Whether target directories already exist

## Port Conflict Detection

Installer must detect if these are in use:
- TCP/UDP 53
- TCP 53443
- Any future dashboard port

If port 53 is already in use, installer must stop and explain.
It must not automatically disable system services without confirmation.

## Installer v1 Scope

### What is Included
- Debian-based systems first
- x86_64 standard profile first
- Raspberry Pi ARM64 as separate installer path
- Technitium via Docker Compose
- Host networking only if reviewed
- Local-only dashboard unless explicitly changed
- Local reports only
- No cloud upload
- No payment integration
- No customer account integration
- No automatic router modification

### What is NOT Included
- Payment/checkout
- Customer dashboard
- R2 customer lead writes
- Automatic public exposure
- Automatic router login
- Automatic ISP router modification
- VPN/Tailscale setup
- AI summarizer
- Model downloads
- Remote management
- Telemetry upload
- Destructive disk formatting
- Multi-machine orchestration

## Security and Privacy Requirements

### Private Data Rules
The installer must not upload:
- IP addresses
- Router details
- Serial numbers
- Wi-Fi names
- Private network topology
- Logs
- Hardware report

Unless a future explicit opt-in support flow is separately reviewed.
Local reports are allowed.

### Customer-Facing Requirements

Before public installer release, Nonaym should have:
- Public requirements page
- Preflight download page
- Checksum verification instructions
- Install risk disclaimer
- Backup reminder
- Privacy/security page links
- Support email
- Known supported hardware list
- Known unsupported hardware list
- Clear "do not install on your main work computer unless backed up" warning

## Review Gate Requirements

Before any install-capable script is written, the following must be reviewed:
- Installer plan
- Command list
- Confirmation prompts
- Rollback plan
- Target paths
- Port behavior
- Docker behavior
- Technitium config behavior
- Logging behavior
- Privacy impact
- Security risks

Danno/security review is required before implementation.

## Implementation Notes

The installer will be implemented in several stages:

1. **Phase 10N** - Design and dry-run command plan
2. **Phase 10O** - Draft actual install script
3. **Phase 10P** - Integration testing with preflight
4. **Phase 10Q** - Security review and finalization
5. **Phase 10R** - Release preparation

The installer must be conservative and follow all safety principles defined in Phase 10M.