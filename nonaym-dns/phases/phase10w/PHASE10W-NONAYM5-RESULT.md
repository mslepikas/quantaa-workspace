# Phase 10W Result — nonaym5 Read-Only Inventory Repeatability Check

Status: Passed

Date: 2026-05-24

## Test target

- Machine name: nonaym5
- Login user: nonaym5
- LAN IP: 192.168.1.217
- Machine type: Lenovo/similar test machine
- Role: third external Nonaym DIY read-only inventory target and repeatability check

GB10/omnieon was not used as the test target.

## Result summary

- nonaym5 was initially unreachable because it was asleep/offline.
- After waking nonaym5, it responded to ping at 192.168.1.217.
- Hostname `nonaym5` did not resolve from omnieon, so the LAN IP was used directly.
- Script copied successfully to nonaym5.
- Script ran successfully on nonaym5.
- Script produced a read-only hardware inventory report.
- No install behavior occurred.
- No disk writes, image writes, package installs, DNS changes, network changes, or service changes occurred.

## Hardware summary

- Architecture: x86_64
- Kernel: Linux 6.12.88+deb13-amd64 x86_64
- CPU: Intel Core i3-6100 CPU @ 3.70GHz
- CPU count shown: 4
- RAM: 7.7 GiB
- Swap: 7.9 GiB
- Boot mode: Legacy BIOS or unknown
- Storage: 238.5G Samsung NVMe
- Root filesystem: LVM root, 229.6G mounted at /
- Primary wired network interface present

## Comparison to prior test machines

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

### nonaym5 result

- CPU: Intel Core i3-6100 CPU @ 3.70GHz
- RAM: 7.7 GiB
- Storage: 238.5G Samsung NVMe
- Boot mode: Legacy BIOS or unknown
- Network: wired Ethernet present

## Interpretation

nonaym5 confirms the Lenovo/x86_64 baseline is repeatable.

nonaym5 is very similar to nonaym4:
- Same CPU class
- Same storage size class
- Same wired Ethernet class
- Same Legacy BIOS or unknown boot result
- Same approximate 8GB RAM class

This strengthens the current internal draft requirements:
- x86_64 first-release target
- 4GB RAM minimum
- 8GB RAM recommended
- 64GB SSD minimum
- 128GB+ SSD/NVMe recommended
- wired Ethernet strongly recommended
- Legacy BIOS should remain tentative but not excluded yet

## Privacy / redaction note

The raw inventory output included a MAC address and local network information.
Those details must not be published publicly without review and redaction.

## Phase 10W verdict

PASS.

The nonaym5 read-only inventory repeatability check succeeded.
The next phase should update the hardware requirements summary using three external test machines:
- nonaym4
- nonaym1
- nonaym5
