# Phase 10R Result — nonaym4 First External Inventory Run

Status: Passed

Date: 2026-05-23

## Test target

- Machine name: nonaym4
- Login user: nonaym4
- LAN IP: 192.168.1.212
- Machine type: Lenovo test machine
- Role: First external Nonaym DIY read-only inventory test target

GB10/omnieon was not used as the test target.

## Result summary

- Script copied successfully to nonaym4.
- Script ran successfully on nonaym4.
- Script produced a read-only hardware inventory report.
- No install behavior occurred.
- No disk writes, image writes, package installs, DNS changes, network changes, or service changes occurred.

## Hardware summary

- Architecture: x86_64
- Kernel: Linux 7.0.0-15-generic x86_64
- CPU: Intel Core i3-6100 CPU @ 3.70GHz
- CPU count shown: 4
- RAM: 7.1 GiB
- Swap: 4.0 GiB
- Boot mode: Legacy BIOS or unknown
- Storage: 238.5G Samsung NVMe
- Root filesystem: Ubuntu LVM, 100G mounted at /
- Primary network interface: enp0s31f6

## Privacy / redaction note

The raw inventory output included a MAC address and local network information.
Those details must not be published publicly without review and redaction.

## Phase 10R verdict

PASS.

The first external Lenovo/x86_64 inventory run succeeded.
The next phase should define minimum Nonaym DIY hardware requirements using this result as one data point.
