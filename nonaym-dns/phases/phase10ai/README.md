# Nonaym DIY Phase 10AI — UnifiPi Identity Details Collection

Status: Read-only identity collection

Purpose:
Collect and document the missing UnifiPi identity details required before any future Raspberry Pi write-command preview can be reviewed.

This phase does not install Nonaym DIY.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Target

- Machine name/hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Hardware class: Raspberry Pi / ARM
- Role: future overwrite/install-capable test target after separate final approval

## Protected production target

The following remains no-write production and must not be touched:

- Protectli 2420
- Host/role: ns2 quantaa
- LAN IP: 10.1.1.109
- Rule: no write, no script copy, no report file, no reboot, no DNS/network/service changes, no install testing

## Phase 10AI allowed actions

- SSH to UnifiPi only.
- Run read-only identity commands.
- Collect hostname, IP, MAC, architecture, storage, and mountpoint details.
- Save results in local documentation on omnieon only.
- Redact MAC address from public/customer-facing documents.

## Still forbidden

- No image writing.
- No disk partitioning.
- No formatting.
- No flashing USB, SD, or NVMe.
- No package installation.
- No DNS changes.
- No service changes.
- No network reconfiguration.
- No reboot.
- No write action against Raspberry Pi / UnifiPi.
- No action against Protectli / ns2 quantaa.

## Required read-only details

Collect:

- hostname
- kernel
- architecture
- primary IP address
- primary interface name
- primary interface MAC address
- block device list
- mounted root filesystem
- confirmation target is not GB10/omnieon
- confirmation target is not Protectli/ns2 quantaa

## Phase 10AI success criteria

Phase 10AI passes when:

- UnifiPi identity details are collected read-only.
- MAC address is documented internally only.
- Storage device and mountpoints are confirmed.
- No machine is modified.
- No install behavior is added.
