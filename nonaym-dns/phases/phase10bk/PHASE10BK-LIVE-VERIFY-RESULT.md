# Nonaym DIY Phase 10BK — Live Read-Only Target Verification Result

Status: Passed

Date: 2026-05-24

## Scope

Phase 10BK performed live read-only target verification against UnifiPi.

No image writing occurred.
No image flashing occurred.
No disk partitioning occurred.
No formatting occurred.
No image mounting occurred.
No package installs occurred.
No DNS changes occurred.
No service changes occurred.
No reboot occurred.
No write action occurred against UnifiPi.
No action occurred against Protectli / ns2 quantaa.

## Confirmed identity

- Hostname: UnifiPi
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Kernel: Linux 6.12.75+rpt-rpi-2712 aarch64
- Primary interface: eth0
- Default route: via 10.1.1.1 dev eth0

## Internal MAC binding

The live MAC address for eth0 was confirmed and matches the expected internal UnifiPi identity.

MAC addresses must remain internal-only and must not be published in customer-facing or shared documentation.

## Confirmed storage

- Main storage device: nvme0n1
- Size: 238.5G
- Model: SANZANG
- Transport: nvme
- Root partition: /dev/nvme0n1p2
- Root mountpoint: /
- Root filesystem type: ext4
- Boot firmware partition: /dev/nvme0n1p1
- Boot firmware mountpoint: /boot/firmware
- Boot firmware filesystem type: vfat
- Swap device: zram0

## Wrong-target guard

Confirmed:

- Expected host: UnifiPi
- Actual host: UnifiPi
- Expected IP: 10.1.1.102
- Protected no-write target must not be this host: ns2 quantaa / 10.1.1.109
- GB10/omnieon must not be this host

## Phase 10BK verdict

PASS.

Live read-only identity, network, and storage verification succeeded.

Still forbidden until later reviewed phases:

- No image writing.
- No image flashing.
- No disk partitioning.
- No formatting.
- No image mounting.
- No package installs.
- No DNS changes.
- No service changes.
- No reboot.
- No write action against Protectli / ns2 quantaa.
- No actual write action against Raspberry Pi / UnifiPi.
