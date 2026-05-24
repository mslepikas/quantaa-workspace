# Nonaym DIY Phase 10CG — Lenovo nonaym5 Read-Only Result

Status: Passed

Date: 2026-05-24

## Summary

Phase 10CG pivoted the next Nonaym DIY write/boot target from Raspberry Pi / UnifiPi NVMe to Lenovo nonaym5.

The nonaym5 read-only reachability and hardware check passed.

## Target

- Machine: Lenovo nonaym5
- Hostname: nonaym5
- Login user: nonaym5
- LAN IP: 192.168.1.217
- Architecture: x86_64
- Kernel: Linux 6.12.88+deb13-amd64

## Storage

Main disk:

- Device: nvme0n1
- Size: 238.5G
- Model: SAMSUNG MZVLB256HAHQ-000L7
- Transport: nvme

Current partition/layout:

- nvme0n1p1: 976M mounted at /boot
- nvme0n1p2: 1K extended/container marker
- nvme0n1p5: 237.5G LVM container
- nonaym5--vg-root: 229.6G mounted at /
- nonaym5--vg-swap_1: 7.9G swap

## Boot mode

- Legacy BIOS or unknown

## Network

- Primary interface: enp0s31f6
- IPv4: 192.168.1.217/24

## Assessment

nonaym5 is a better next first-boot Nonaym DIY install/write target than Raspberry Pi / UnifiPi NVMe because:

- It is x86_64.
- It has a normal PC-style internal NVMe.
- It avoids Raspberry Pi EEPROM/NVMe boot complexity.
- It better represents a repurposed customer PC/laptop style DIY target.

## Safety status

- Read-only commands only.
- No image write occurred.
- No disk partitioning occurred.
- No formatting occurred.
- No reboot occurred.
- No DNS/service/network changes occurred.
- Protectli / ns2 quantaa / 10.1.1.109 was not touched.

## Next step

Proceed to Phase 10CH planning for x86_64 image/artifact selection and write-safety planning for nonaym5.

Do not reuse the Raspberry Pi OS ARM image for nonaym5.
