# Nonaym DIY Phase 10AM — Filled-In Raspberry Pi Command-Preview Packet

Status: Preview only / no execution

Purpose:
Create the first filled-in Raspberry Pi / UnifiPi command-preview packet using known target identity and storage details, while leaving the image artifact unselected.

This phase does not install Nonaym DIY.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Target identity

- Hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Primary interface: eth0
- MAC address: stored internally only, not published here
- Protected production target: Protectli / ns2 quantaa / 10.1.1.109
- GB10/omnieon role: editing/staging only, not test target

## Target storage

Known from Phase 10AI read-only identity collection:

- Target block device candidate: nvme0n1
- Device size: 238.5G
- Device model: SANZANG
- Transport: nvme
- Current root partition: nvme0n1p2 mounted at /
- Boot firmware partition: nvme0n1p1 mounted at /boot/firmware
- Filesystem: ext4 on root partition

Before any future write, these values must be verified live again.

## Image/source artifact

Current status:

- Image artifact: TBD
- Image version/build: TBD
- Image checksum: TBD
- Image source path: TBD
- Raspberry Pi / ARM compatibility: TBD

No write command can be approved until the image artifact is selected, checksummed, and reviewed.

## Command-preview status

No runnable write command is included in Phase 10AM.

A future command-preview phase must fill in:

- Exact source image
- Exact target device
- Exact checksum verification
- Exact command preview
- Exact stop point before execution

## Required live checks before any future write

Before any future write command, collect live read-only confirmation:

- hostname
- IP address
- primary interface
- MAC address
- architecture
- lsblk output
- root mountpoint
- boot mountpoint
- confirmation target is not Protectli / ns2 quantaa
- confirmation target is not GB10/omnieon

## Dry-run / no-op requirement

If a real dry-run exists, use it.

If no true dry-run exists:

- Show live target identity
- Show live storage identity
- Show selected image artifact
- Verify checksum
- Show command preview
- Stop before execution

## Recovery plan required before write

Future write approval requires:

- Known-good Raspberry Pi recovery image or installer media
- Recovery tool/method
- Physical access confirmed
- Reflash method if test fails
- Expected post-recovery boot behavior
- Network recovery plan if UnifiPi does not return online

## Network isolation required before write

Future write approval requires:

- Isolation method selected
- Confirmation no production service depends on UnifiPi
- Confirmation Protectli / ns2 quantaa is not involved
- Confirmation test can continue if UnifiPi goes offline

## Rollback/failure plan required before write

Future write approval requires:

- Stop procedure if write fails
- Reflash or restore procedure
- Boot verification procedure
- Network verification procedure
- Failure documentation path
- Rule: no risky live fixes

## Final approval phrase

Required exact phrase before any future write:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

No write command may run unless:

- Q approves the filled packet
- Danno approves the filled packet
- Human operator enters the exact approval phrase immediately before execution

## Phase 10AM success criteria

Phase 10AM passes when:

- Known UnifiPi identity details are filled in
- Known storage details are filled in
- Image artifact remains TBD
- No runnable write command is included
- Future live checks are required
- Future Q/Danno/human approval gates remain intact
- No image writing occurs
- No machine is modified
