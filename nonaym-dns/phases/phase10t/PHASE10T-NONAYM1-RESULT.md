# Phase 10T Result — nonaym1 Generic Intel Inventory Run

Status: Passed

Date: 2026-05-23

## Test target

- Machine name: nonaym1
- Login user: nonaym1
- LAN IP: 192.168.1.211
- Machine type: generic Intel test machine
- Role: second external Nonaym DIY read-only inventory comparison target

GB10/omnieon was not used as the test target.

## Result summary

- Script copied successfully to nonaym1.
- Script ran successfully on nonaym1.
- Script produced a read-only hardware inventory report.
- No install behavior occurred.
- No disk writes, image writes, package installs, DNS changes, network changes, or service changes occurred.

## Hardware summary

- Architecture: x86_64
- Kernel: Linux 6.12.85+deb13-amd64 x86_64
- CPU: Intel Core i5-3317U CPU @ 1.70GHz
- CPU count shown: 4
- RAM: 7.7 GiB
- Swap: 6.1 GiB
- Boot mode: Legacy BIOS or unknown
- Storage: 119.2G SATA SSD, IM128-WG30
- Root filesystem: 113.2G partition mounted at /
- Primary wired network interface present

## Comparison to nonaym4

### nonaym4 baseline

- CPU: Intel Core i3-6100 CPU @ 3.70GHz
- RAM: 7.1 GiB
- Storage: 238.5G Samsung NVMe
- Boot mode: Legacy BIOS or unknown
- Network: wired Ethernet present

### nonaym1 comparison

- CPU: Intel Core i5-3317U CPU @ 1.70GHz
- RAM: 7.7 GiB
- Storage: 119.2G SATA SSD
- Boot mode: Legacy BIOS or unknown
- Network: wired Ethernet present

## Interpretation

nonaym1 is an older/lower-power generic Intel system than nonaym4 but still meets the early draft planning direction:

- x86_64 architecture
- approximately 8GB RAM class
- SSD storage above 64GB
- wired Ethernet available
- Legacy BIOS or unknown boot mode still needs more validation

This supports keeping early minimums conservative:

- 4GB RAM minimum
- 8GB RAM recommended
- 64GB SSD minimum
- 128GB+ SSD/NVMe recommended
- wired Ethernet strongly recommended
- x86_64 first-release preferred

## Privacy / redaction note

The raw inventory output included MAC addresses, local network information, Docker bridge interfaces, and virtual interface details.
Those details must not be published publicly without review and redaction.

## Phase 10T verdict

PASS.

The generic Intel / nonaym1 read-only inventory run succeeded.
The next phase should update the minimum hardware requirements draft using both nonaym4 and nonaym1 as baseline data points.
