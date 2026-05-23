# Phase 10O — Nonaym DIY Installer v1 Dry-Run Command Plan

Date: 2026-05-23

## Purpose

Define the exact dry-run command plan and expected output format for a future Nonaym DIY Installer v1.

This phase is design-only.

No installer code is written.
No packages are installed.
No Docker changes are made.
No Technitium changes are made.
No DNS changes are made.
No network changes are made.
No disks are modified.

## Relationship to Phase 10N

Phase 10N defined the installer design.

Phase 10O defines what the installer dry-run must print before any install-capable code is built.

The dry-run must make the installer behavior understandable before it is allowed to modify a system.

## Dry-Run Command Concept

Future command:

./nonaym-installer.sh --dry-run

The command must:

- run read-only checks
- print what would happen
- print what would not happen
- print exact confirmation gates
- print commands that would be used later
- print rollback instructions
- print emergency stop instructions
- exit without changing the system

## Dry-Run Safety Contract

The dry-run must not:

- install packages
- run apt install
- run Docker install
- pull Docker images
- start containers
- stop containers
- edit system files
- create /opt/nonaym
- modify /etc
- modify /etc/resolv.conf
- modify /etc/systemd/resolved.conf
- disable systemd-resolved
- change NetworkManager
- change firewall rules
- format or repartition disks
- upload logs
- upload reports

Allowed:

- create local dry-run report under ./reports/
- read OS and hardware data
- check command availability
- check port usage
- check Docker status
- check network interfaces
- display planned actions

## Required Dry-Run Sections

The dry-run output must include these sections in order:

1. Header
2. Safety statement
3. Machine summary
4. Existing preflight report status
5. Root / sudo state
6. OS support check
7. Hardware requirement check
8. Network adapter check
9. Port conflict check
10. Docker status check
11. systemd-resolved check
12. Planned install path
13. Planned file layout
14. Planned Docker Compose design
15. Planned Technitium image source
16. Planned confirmation gates
17. Planned commands
18. What will not be changed
19. Rollback plan
20. Emergency stop plan
21. Privacy statement
22. Final dry-run decision

## Section 1 — Header

Example:

Nonaym DIY Installer v1 — Dry Run
==================================
Mode: DRY RUN ONLY
Date: YYYY-MM-DD HH:MM:SS
Hostname: example-host
Script version: installer-v1-dry-run-draft

## Section 2 — Safety Statement

Required output:

This is a dry run.
No packages will be installed.
No Docker containers will be started.
No DNS settings will be changed.
No network settings will be changed.
No disks will be formatted.
No files outside the dry-run report folder will be modified.

## Section 3 — Machine Summary

Must display:

- OS
- architecture
- CPU cores
- memory
- total disk capacity
- root filesystem free space
- boot mode
- Raspberry Pi detected yes/no
- recommended profile from preflight
- PASS / CAUTION / FAIL result

## Section 4 — Existing Preflight Report Status

Dry-run must check for previous reports.

Possible output:

Existing reports found:
- ./reports/nonaym-hardware-report-YYYYMMDD-HHMMSS.txt

Decision:
A new preflight must still be generated during installer run.
Previous reports are reference only.

If no reports found:

No existing preflight reports found.
A new preflight would be generated before install.

## Section 5 — Root / Sudo State

Must detect current user and root status.

If not root:

Root status: not root
Sudo may be requested only for specific guided install steps.

If root:

Root status: root
WARNING: Running as root can create root-owned files.
Guided install would require typed confirmation:
I UNDERSTAND ROOT INSTALL RISKS

## Section 6 — OS Support Check

Must display:

- detected OS
- supported family yes/no
- package manager detected
- systemd detected yes/no

Dry-run decision:

Debian/Ubuntu-family systems are first target.
Unsupported OS must result in dry-run FAIL.

## Section 7 — Hardware Requirement Check

Must display PASS / CAUTION / FAIL from preflight.

Dry-run rule:

- PASS: can continue to install planning
- CAUTION: user must review warnings before install
- FAIL: installer must not continue

## Section 8 — Network Adapter Check

Must display:

- default route interface
- Ethernet adapters
- Wi-Fi adapters
- active IPv4 addresses
- active IPv6 addresses if readable

Rules:

- Ethernet recommended
- Wi-Fi-only is CAUTION
- multiple Ethernet adapters require user selection in future guided install
- dry-run must not change interface settings

## Section 9 — Port Conflict Check

Must check planned ports:

- UDP 53
- TCP 53
- TCP 53443

Dry-run should show planned commands:

ss -lntup | grep ':53'
ss -lnuap | grep ':53'
ss -lntup | grep ':53443'

If port 53 is busy:

Dry-run decision: FAIL
Reason: DNS port 53 is already in use.

If port 53443 is busy:

Dry-run decision: FAIL or CAUTION
Reason: dashboard port conflict requires review.

Dry-run must not stop services.

## Section 10 — Docker Status Check

Must display:

- docker command present yes/no
- docker compose available yes/no
- docker service active yes/no/unknown
- docker socket present yes/no
- likely install source if detectable

Rules:

- Existing working Docker may be used in later guided install.
- Missing Docker does not cause dry-run failure by itself.
- Automatic Docker install is not approved in installer v1 unless separately reviewed.

## Section 11 — systemd-resolved Check

Must display:

- systemd-resolved active yes/no/unknown
- resolvectl available yes/no
- whether port 53 appears in use

Rules:

- Do not disable systemd-resolved.
- Do not edit resolved.conf.
- Do not edit resolv.conf.
- If systemd-resolved holds port 53, guided install must stop with instructions.

## Section 12 — Planned Install Path

Installer v1 planned test path:

~/nonaym/

Dry-run must print:

Would create:
~/nonaym/
~/nonaym/config/
~/nonaym/logs/
~/nonaym/reports/
~/nonaym/backups/
~/nonaym/scripts/

Dry-run must not create these directories unless the dry-run report folder itself is needed.

## Section 13 — Planned File Layout

Would write in guided install:

~/nonaym/docker-compose.yml
~/nonaym/scripts/nonaym-control.sh
~/nonaym/reports/install-report-YYYYMMDD-HHMMSS.txt
~/nonaym/backups/YYYYMMDD-HHMMSS/

Would not write:

/opt/nonaym/
/etc/resolv.conf
/etc/systemd/resolved.conf
router settings
firewall rules

## Section 14 — Planned Docker Compose Design

Dry-run must print planned Compose design:

Service:

nonaym-dns

Image:

technitium/dns-server:<pinned-version-or-digest>

Network mode:

bridge with explicit published ports

Ports:

53:53/tcp
53:53/udp
53443:53443/tcp

Volumes:

~/nonaym/config:/etc/dns
~/nonaym/logs:/var/log/dns

Restart:

unless-stopped

Important:

Do not use `latest` without later review.

## Section 15 — Planned Technitium Image Source

Dry-run must print:

Technitium image will be pinned before implementation.
No unpinned latest image is approved for installer v1.

Required before implementation:

- choose exact Technitium tag or digest
- document image source
- document update procedure
- document rollback procedure

## Section 16 — Planned Confirmation Gates

Dry-run must display all typed phrases:

1. CONTINUE NONAYM INSTALL
2. INSTALL NONAYM PACKAGES
3. START NONAYM DNS
4. I UNDERSTAND ROOT INSTALL RISKS, if root
5. I UNDERSTAND THIS MAY ERASE DATA, future only, not approved in v1

Dry-run must say:

Destructive disk actions are not approved in installer v1.

## Section 17 — Planned Commands

Dry-run must print future guided-install command categories.

### Preflight commands

Would run:

./nonaym-diy-preflight.sh

Would inspect:

uname -m
cat /etc/os-release
df -h
lsblk
ip addr
ip route
ss port checks

### Directory commands

Would run after confirmation:

mkdir -p ~/nonaym/config
mkdir -p ~/nonaym/logs
mkdir -p ~/nonaym/reports
mkdir -p ~/nonaym/backups
mkdir -p ~/nonaym/scripts

### Docker status commands

Would run:

docker --version
docker compose version
systemctl is-active docker

### Compose commands

Would run only after final confirmation:

cd ~/nonaym
docker compose pull
docker compose up -d

### Verification commands

Would run after start:

docker ps
docker compose ps
ss -lntup | grep ':53'
ss -lnuap | grep ':53'
ss -lntup | grep ':53443'

## Section 18 — What Will Not Be Changed

Required output:

The installer v1 dry-run will not change:

- router settings
- DHCP settings
- client DNS settings
- Wi-Fi settings
- firewall rules
- VPN settings
- Tailscale settings
- cloud settings
- payment settings
- customer data
- disk partitions

## Section 19 — Rollback Plan

Dry-run must print rollback commands:

cd ~/nonaym
docker compose down

Then verify:

docker ps
ss -lntup | grep ':53'
ss -lnuap | grep ':53'
ss -lntup | grep ':53443'

Optional cleanup:

rm -rf ~/nonaym

Important:

Installer v1 will not automatically uninstall Docker.

## Section 20 — Emergency Stop Plan

Required output:

Emergency stop:

cd ~/nonaym
docker compose down

If DNS breaks:

1. Stop Nonaym DNS container.
2. Remove this machine as DNS target from router/client settings manually.
3. Restore router/client DNS to prior setting.
4. Do not continue until reviewed.

## Section 21 — Privacy Statement

Required output:

Dry-run reports are local only.

The installer will not upload:

- IP addresses
- router details
- serial numbers
- Wi-Fi names
- DNS logs
- hardware reports
- install logs

Any future support upload must be opt-in and separately reviewed.

## Section 22 — Final Dry-Run Decision

Dry-run must end with one of:

NONAYM INSTALLER DRY-RUN RESULT: PASS
NONAYM INSTALLER DRY-RUN RESULT: CAUTION
NONAYM INSTALLER DRY-RUN RESULT: FAIL

### PASS

Use when:

- preflight PASS
- supported OS
- no blocking port conflicts
- Docker ready or manual Docker step clearly required
- Ethernet present or acceptable
- enough disk and memory

### CAUTION

Use when:

- preflight CAUTION
- Wi-Fi-only
- Docker missing but OS supported
- dashboard port conflict may be resolvable
- running as root
- multiple NICs need manual selection

### FAIL

Use when:

- preflight FAIL
- unsupported OS
- port 53 conflict blocks DNS
- insufficient disk/memory
- no usable network
- system state is unsafe or unknown

## Example Final Output

NONAYM INSTALLER DRY-RUN RESULT: PASS
Reason: Hardware and OS are suitable, no blocking port conflicts found.
Next step: review this dry-run report before any guided install phase.

## Phase 10O Decision

Phase 10O is complete when:

- this dry-run command plan is reviewed
- Danno/security review accepts or gives required changes
- no installer code has been written
- next phase is explicitly defined

## Recommended Next Phase

Phase 10P — Draft Installer v1 Dry-Run Script Skeleton

Purpose:

Create a non-installing script skeleton that prints the dry-run plan only.

No install behavior should be added in 10P.
