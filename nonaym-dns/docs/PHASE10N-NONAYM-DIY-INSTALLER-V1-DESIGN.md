# Phase 10N — Nonaym DIY Installer v1 Design

Date: 2026-05-23

## Purpose

Draft the design for a future Nonaym DIY installer v1.

This phase is design-only.

No installer code is written in this phase.
No package installation is performed.
No Docker installation is performed.
No Technitium installation is performed.
No disk changes are performed.
No DNS/router/network changes are performed.

## Current Approved Baseline

The current working package is the read-only public preflight package:

- Package: https://nonaym.ai/download/files/nonaym-diy-preflight-phase10k.tar.gz
- Script version: phase10j-v2.1
- Validated on x86_64: nonaym4
- Validated on ARM64/Raspberry Pi: UnifiPi
- Result: PASS on both architecture paths

## Installer v1 Status

A real install-capable script is not approved yet.

This document defines what that future installer should do.

Implementation requires a later phase and a separate Danno/security review.

## Installer v1 Goals

Installer v1 should:

1. Run preflight first
2. Show a dry-run plan before making changes
3. Require typed confirmations before install actions
4. Install only the minimum required components
5. Create a local Nonaym folder layout
6. Prepare Technitium DNS via Docker Compose
7. Avoid router automation
8. Avoid cloud uploads
9. Avoid destructive disk actions
10. Produce clear install and rollback instructions

## Installer v1 Non-Goals

Installer v1 must not include:

- payment or checkout
- customer dashboard
- public admin dashboard exposure
- R2 customer data writes
- account login
- telemetry upload
- remote management
- AI model installation
- Tailscale/VPN setup
- router auto-login
- DHCP/router DNS automation
- disk repartitioning
- disk formatting
- multi-machine orchestration

## Installer Modes

### Mode 1 — Preflight Only

Command concept:

./nonaym-installer.sh --preflight

Allowed:

- run hardware checks
- run OS checks
- check ports
- check Docker presence
- check network adapters
- create local report

Not allowed:

- install packages
- create system directories
- start containers
- stop system services
- change DNS
- change networking

### Mode 2 — Dry Run

Command concept:

./nonaym-installer.sh --dry-run

Allowed:

- print exact install plan
- print package actions that would occur
- print directory creation plan
- print Docker Compose plan
- print port usage plan
- print confirmation gates
- print rollback plan

Not allowed:

- package install
- Docker install
- file writes outside report folder
- service start/stop
- DNS/network changes

### Mode 3 — Guided Install

Command concept:

./nonaym-installer.sh --install

Allowed only after typed confirmations:

- create Nonaym directories
- install required dependencies
- install/configure Docker according to approved Docker strategy
- place docker-compose.yml
- pull pinned Technitium image
- start service after final confirmation
- write install report

Not allowed in v1:

- format disks
- repartition disks
- modify router settings
- expose dashboard publicly
- upload reports
- silently disable system services

## Required Typed Confirmation Gates

### Gate 1 — Continue Past Preflight

Required typed phrase:

CONTINUE NONAYM INSTALL

Purpose:

Allows installer to continue from preflight/dry-run into install preparation.

### Gate 2 — Install Packages

Required typed phrase:

INSTALL NONAYM PACKAGES

Purpose:

Allows OS package installation and Docker setup actions.

### Gate 3 — Start DNS Service

Required typed phrase:

START NONAYM DNS

Purpose:

Allows Technitium DNS container/service start.

### Gate 4 — Destructive Actions

Required typed phrase:

I UNDERSTAND THIS MAY ERASE DATA

Phase 10N decision:

Destructive disk actions are not approved for installer v1.

This gate is documented for future versions only.

## Root Behavior

Installer v1 must detect root state.

### If not root

Preferred mode.

Installer may:

- run preflight
- run dry-run
- ask for sudo only when needed during guided install

### If root

Installer must warn:

Running as root may create root-owned files and can make rollback/maintenance harder.

Installer must record root state in the report.

Installer should discourage root for preflight and dry-run.

For guided install, root/sudo may be needed, but privilege escalation should occur only at specific steps.

### Root Confirmation

If launched as root for guided install, require typed phrase:

I UNDERSTAND ROOT INSTALL RISKS

## Docker Installation Strategy

Docker install is high-risk and must be explicit.

Installer v1 must detect existing Docker before installing anything.

### Docker Detection

Check:

- docker command exists
- docker compose command exists
- docker service status
- Docker socket presence
- Docker package source if detectable
- whether Docker appears to be snap, apt, or official Docker repo

### Docker Strategy Decision

Preferred v1 strategy:

Use existing Docker if it is already installed and functional.

If Docker is missing, installer v1 should stop and provide manual Docker installation instructions unless a later phase approves automatic Docker install.

Reason:

Docker installation varies by OS and can conflict across:

- OS package repositories
- Docker official repository
- snap packages
- old Docker packages
- existing Docker socket permissions

### Future Optional Docker Install

If later approved, Docker install must use one documented strategy only.

Candidate strategy:

- Debian/Ubuntu apt packages
- avoid snap Docker
- verify docker compose plugin
- document user/group behavior
- require typed confirmation

But this is not approved in v1 design yet.

## Docker Image Pinning

Installer v1 must not use unpinned `latest` for production installer behavior.

Technitium image should be pinned.

Preferred:

- use a specific Technitium DNS Server version tag if available and tested
- record image name and tag in install report

Stronger future option:

- pin image digest after testing

Phase 10N decision:

Do not use `technitium/dns-server:latest` in installer v1 without a later review.

## Docker Compose Network Mode

### Options

#### Host Network

Pros:

- simple DNS binding
- fewer Docker networking surprises

Cons:

- monopolizes host port 53
- can conflict with `systemd-resolved`
- less isolation

#### Bridge Network with Published Ports

Pros:

- clearer port mapping
- more conventional Compose setup
- easier to reason about exposed ports

Cons:

- DNS UDP/TCP behavior must be tested carefully
- port 53 conflicts can still happen at published port level

### Phase 10N Default Decision

Use bridge networking with explicit port publishing as the first design target:

- TCP/UDP 53
- TCP 53443 dashboard

Host networking is deferred unless testing shows bridge mode fails for Technitium DNS requirements.

## Port Plan

Required ports:

- UDP 53
- TCP 53
- TCP 53443

Before install, check whether ports are already in use.

If port 53 is in use:

- stop installer
- explain likely causes
- show process/service using the port if readable
- do not automatically disable anything

If port 53443 is in use:

- stop installer or ask user to choose a different dashboard port in future version
- v1 should stop rather than auto-pick ports

## systemd-resolved Handling

Installer must check `systemd-resolved`.

Commands for dry-run documentation may include:

- systemctl is-active systemd-resolved
- resolvectl status
- ss -lntup | grep ':53'

Rules:

- Do not automatically disable `systemd-resolved`
- Do not automatically edit `/etc/systemd/resolved.conf`
- Do not automatically change `/etc/resolv.conf`

If `systemd-resolved` is holding port 53:

Installer v1 should FAIL with instructions.

Future installer versions may provide a guided manual remediation, but v1 should not modify it.

## Existing Preflight Report Handling

Installer should always regenerate preflight at install time.

Reason:

Hardware/network/port state can change.

If an old preflight report exists:

- list it
- offer to reference it
- still generate a new preflight report
- record both old and new report paths

Installer must not assume a previous PASS is still valid.

## File Layout

Preferred early test layout:

~/nonaym/

Suggested:

~/nonaym/
  docker-compose.yml
  config/
  logs/
  reports/
  backups/
  scripts/

Future system layout:

/opt/nonaym/

Phase 10N decision:

Use `~/nonaym/` for first installer testing.

Do not use `/opt/nonaym/` until system install behavior is reviewed.

## File Permissions and Ownership

For user-space test layout:

- owner should be the invoking user
- avoid root-owned files where possible
- reports should be readable by the user
- config files should not be world-writable

Suggested default:

- directories: 750
- scripts: 750
- reports: 640 or 644 depending on support needs
- config: 750 or stricter

If sudo/root is used:

- installer must record file owner
- installer must warn if files are root-owned

## Config Drift Detection

Installer must detect existing files before writing.

Before overwriting any file:

- calculate checksum of existing file
- compare to expected previous installer checksum if available
- if modified, stop and warn
- create backup before replacing
- do not overwrite user-modified config silently

Drift-sensitive files:

- docker-compose.yml
- config files
- env files
- scripts
- previous install report

## Backup Plan

Before guided install writes files:

- create backup folder
- copy existing Nonaym files if present
- record backup path
- record timestamp
- include list of backed-up files

Suggested path:

~/nonaym/backups/YYYYMMDD-HHMMSS/

## Rollback Plan

Installer v1 must print rollback instructions during dry-run and after install.

Manual rollback procedure should include:

1. Stop container:

docker compose down

2. Confirm no Nonaym container remains:

docker ps -a | grep nonaym

3. Optional remove container/image:

docker rm nonaym-dns
docker image rm technitium/dns-server:<pinned-tag>

4. Restore backup files if needed.

5. Remove Nonaym test folder if desired:

rm -rf ~/nonaym

6. Confirm ports are free:

ss -lntup | grep ':53'
ss -lntup | grep ':53443'

7. Confirm DNS behavior restored manually.

Important:

Installer v1 should not automatically uninstall Docker.

Reason:

Docker may have been installed for other workloads.

## Emergency Stop Procedure

Installer output must include:

Emergency stop:

cd ~/nonaym
docker compose down

Then verify:

docker ps
ss -lntup | grep ':53'
ss -lntup | grep ':53443'

If network/DNS breaks:

- disconnect the Nonaym test machine from being DNS target
- restore router/client DNS settings manually
- do not rely on the test machine until reviewed

## Network Adapter Selection

Installer v1 should not automatically bind to a specific adapter.

It should detect:

- default route interface
- Ethernet adapters
- Wi-Fi adapters
- active IPs

Suggested behavior:

- show default route interface
- show Ethernet adapters
- show Wi-Fi adapters
- recommend Ethernet
- if multiple Ethernet adapters exist, require user selection
- if Wi-Fi-only, continue only as CAUTION
- do not modify interface configuration

## Privacy Rules

Installer must not upload:

- private IP addresses
- serial numbers
- router details
- Wi-Fi names
- DNS logs
- preflight reports
- install logs

Local-only reports are allowed.

Future support upload must be opt-in and separately reviewed.

## Dry-Run Output Requirements

Dry-run must show:

- target install path
- Docker status
- package requirements
- ports needed
- ports currently in use
- network adapters
- confirmation gates
- exact commands that would run
- rollback instructions
- emergency stop instructions

## Installer v1 Acceptance Criteria

Before writing installer code, the design must be accepted by Danno/security review.

Installer v1 code is not approved until:

- design reviewed
- dry-run command plan reviewed
- rollback procedure reviewed
- Docker strategy reviewed
- network mode reviewed
- port conflict behavior reviewed
- privacy rules reviewed

## Phase 10N Decision

Phase 10N is complete when:

- this design document is reviewed
- Danno AMBER items from Phase 10M are addressed
- no installer code has been written
- next implementation phase is explicitly approved or rejected

## Recommended Next Phase

Phase 10O — Nonaym DIY Installer v1 Dry-Run Command Plan

Purpose:

Create the exact dry-run command plan and output format before writing installer code.
