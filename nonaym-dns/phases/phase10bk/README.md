# Nonaym DIY Phase 10BK — Live Read-Only Target Verification from UnifiPi

Status: Read-only live verification

Purpose:
Collect fresh live read-only identity, network, and storage details from UnifiPi before any future final write-command preview.

This phase does not write an image.
This phase does not flash USB, SD, or NVMe.
This phase does not partition disks.
This phase does not format disks.
This phase does not mount the image.
This phase does not install Nonaym DIY.
This phase does not modify DNS, network settings, packages, disks, or services.
This phase does not reboot any machine.

## Target

- Hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Expected architecture: aarch64
- Expected storage candidate: nvme0n1
- Expected storage model: SANZANG
- Expected storage size: 238.5G

## Protected production target

The following remains no-write production:

- Protectli 2420 / ns2 quantaa / 10.1.1.109

Hard rules:
- no write
- no script copy
- no reboot
- no DNS/network/service changes
- no install testing
- no use as a target

## Allowed in Phase 10BK

- SSH to UnifiPi.
- Run read-only commands only.
- Collect hostname, kernel, architecture, IP, interface, MAC, storage, mountpoint, and root filesystem details.
- Save/document redacted result on omnieon.
- Keep MAC address internal-only.

## Still forbidden in Phase 10BK

- No image writing.
- No image flashing.
- No disk partitioning.
- No formatting.
- No image mounting.
- No package installs.
- No DNS changes.
- No service changes.
- No network reconfiguration.
- No reboot.
- No write action against Raspberry Pi / UnifiPi.
- No write action against Protectli / ns2 quantaa.
- No action against any production target.

## Required live read-only checks

Collect:

- hostname
- kernel
- architecture
- IP addresses
- link/MAC details
- default route
- block device list
- root filesystem mount
- boot firmware mount
- confirmation target is not GB10 / omnieon
- confirmation target is not Protectli / ns2 quantaa

## Sensitive handling

The live MAC address must be used only for internal wrong-target prevention.

Do not publish MAC addresses in customer-facing documentation.

## Phase 10BK success criteria

Phase 10BK passes when:

- Live UnifiPi identity is confirmed.
- Live UnifiPi storage is confirmed.
- Live MAC/IP binding is confirmed internally.
- No write behavior occurs.
- No machine is modified.
