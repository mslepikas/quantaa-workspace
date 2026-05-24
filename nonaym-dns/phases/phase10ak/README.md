# Nonaym DIY Phase 10AK — Raspberry Pi Write-Command Preview Packet

Status: Preview packet only

Purpose:
Prepare a future write-command preview packet for Raspberry Pi / UnifiPi without executing any image-writing or install behavior.

This phase does not install Nonaym DIY.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Target

- Hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Intended future target storage: nvme0n1
- Current root partition: nvme0n1p2 mounted at /
- Current boot firmware partition: nvme0n1p1 mounted at /boot/firmware
- Role: first approved future overwrite/install-capable test target after final review and approval

## Protected production target

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- Status: production
- Rule: no write, no script copy, no report file, no reboot, no DNS/network/service changes, no install testing

## Prior approval chain

- Phase 10AI: UnifiPi identity collected read-only.
- Phase 10AJ: Q/Danno approved UnifiPi identity binding.
- Phase 10AH: write-command preview requirements documented.
- Phase 10AG: Q/Danno approved strengthened checklist.

## Still forbidden in Phase 10AK

- No image writing.
- No disk partitioning.
- No formatting.
- No flashing USB, SD, or NVMe.
- No package installation.
- No DNS changes.
- No service changes.
- No network reconfiguration.
- No reboot.
- No actual write action against Raspberry Pi / UnifiPi.
- No write action against Protectli / ns2 quantaa.

## Required future write packet fields

A later reviewed write phase must fill in all fields below.

### 1. Live target identity verification

Required before future write:

- Live hostname:
- Live IP:
- Live SSH user:
- Live architecture:
- Live primary interface:
- Live MAC address:
- Stored expected MAC address:
- MAC match confirmed:
- Confirm target is not GB10/omnieon:
- Confirm target is not Protectli/ns2 quantaa:

Status now:
- Not filled in Phase 10AK.
- Must be collected again live before any future write.

### 2. Live target storage verification

Required before future write:

- Live target block device:
- Live target size:
- Live target model:
- Live current mountpoints:
- Confirm target device can be erased:
- Confirm no needed data remains:
- Confirm no other disk is selected:

Expected from Phase 10AI:
- Device: nvme0n1
- Size: 238.5G
- Model: SANZANG
- Root: nvme0n1p2 mounted at /
- Boot firmware: nvme0n1p1 mounted at /boot/firmware

Status now:
- Must be verified live again before any future write.

### 3. Image/source artifact

Required before future write:

- Image filename/path:
- Image version/build:
- Image source:
- Checksum filename/path:
- Checksum verification command:
- Checksum result:
- Confirm image is intended for Raspberry Pi / ARM:

Status now:
- No final image selected.
- No image checksum verified.
- No write command can be approved until image artifact is selected and verified.

### 4. Command preview

A later write phase must show the exact command in preview form only before execution.

Phase 10AK intentionally does not include a runnable write command.

Required before future write:
- Exact source image:
- Exact target device:
- Exact command preview:
- Confirmation command points only to UnifiPi target storage:
- Confirmation command does not reference Protectli:
- Confirmation command does not reference GB10/omnieon storage:

### 5. Dry-run / no-op verification

Required before future write:

- True dry-run available: yes/no
- Dry-run command if available:
- Dry-run output:
- If no true dry-run exists, manual stop-before-write checklist completed:

Manual checklist must include:
- target identity shown
- target storage shown
- image artifact shown
- checksum verified
- command preview shown
- explicit stop before execution

### 6. Recovery / reflash plan

Required before future write:

- Known-good Raspberry Pi recovery image/media:
- Recovery tool/method:
- Physical access confirmed:
- Reflash method if write fails:
- Expected post-recovery boot behavior:
- Network recovery plan if UnifiPi does not return online:
- Operator accepts temporary unbootable risk:

### 7. Network isolation plan

Required before future write:

- Isolation method:
- Main LAN / isolated VLAN / direct connection / isolated switch:
- Confirm no production service depends on UnifiPi:
- Confirm Protectli/ns2 quantaa is not involved:
- Confirm test may continue if UnifiPi goes offline:

### 8. Rollback / failure plan

Required before future write:

- Stop procedure if write fails:
- Reflash or restore procedure:
- Boot verification procedure:
- Network verification procedure:
- Failure documentation location:
- Rule: no risky live fixes:

### 9. Final approval phrase

Required exact phrase before future write:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

No write command may run unless:
- Q approves the filled packet.
- Danno approves the filled packet.
- Human operator enters the exact approval phrase immediately before execution.

## Phase 10AK success criteria

Phase 10AK passes when:

- Write-command preview packet fields are documented.
- No runnable write command is included.
- Image/source artifact remains unselected.
- Future live identity verification is required.
- Future live storage verification is required.
- Final approval phrase is documented.
- No image writing occurs.
- No machine is modified.
