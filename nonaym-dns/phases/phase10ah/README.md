# Nonaym DIY Phase 10AH — Raspberry Pi Write-Command Preview Preparation

Status: Planning / preview only

Purpose:
Prepare the future Raspberry Pi / UnifiPi write-command preview checklist without executing image-writing, partitioning, formatting, or install behavior.

This phase does not install Nonaym DIY.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Approved planning target

- Hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Role: first approved future overwrite/install-capable test target after final approval

## Protected production target

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- Status: production
- Rule: no write, no script copy, no report file, no reboot, no DNS/network/service changes, no install testing

## Prior approval chain

- Phase 10AB: install-test safety policy created
- Phase 10AC: Q/Danno approved install-test safety policy
- Phase 10AD: Raspberry Pi install-capable planning created
- Phase 10AE: Q/Danno reviewed install planning and requested refinements
- Phase 10AF: strengthened checklist created
- Phase 10AG: Q/Danno approved strengthened checklist

## Still forbidden in Phase 10AH

- No image writing
- No disk partitioning
- No formatting
- No flashing USB, SD, or NVMe
- No package installation
- No DNS changes
- No service changes
- No network reconfiguration
- No reboot
- No actual write action against Raspberry Pi / UnifiPi
- No write action against Protectli / ns2 quantaa

## Future write-command preview requirements

A later write phase must document all of these before execution.

### 1. Target identity

Required:
- Hostname
- LAN IP
- SSH user
- Architecture
- MAC address for the approved interface
- Confirmation target is not Protectli / ns2 quantaa
- Confirmation target is not GB10 / omnieon

Current known target:
- Hostname: UnifiPi
- LAN IP: 10.1.1.102
- SSH user: mslepikas
- Architecture: aarch64

MAC address must be verified and stored internally before any future write phase.

### 2. Target storage

Required:
- Exact target block device
- Device size
- Device model
- Existing mountpoints
- Confirmation device can be erased
- Confirmation no needed data remains on target

Current observed inventory:
- Device: nvme0n1
- Size: 238.5G
- Model: SANZANG
- Current root partition: nvme0n1p2 mounted at /

### 3. Image/source artifact

Required:
- Exact image filename or artifact path
- Image version/build marker
- Checksum file
- Checksum verification command
- Source location
- Confirmation artifact is intended for Raspberry Pi / ARM if applicable

Current status:
- No final image artifact selected yet.
- No write command may be prepared for execution until image artifact is selected and verified.

### 4. Future command preview

A future write phase must show the exact command before execution.

The final command must not be run unless:
- Q review approves it
- Danno review approves it
- Human operator enters the exact approval phrase immediately before execution

No live write command is included in this Phase 10AH document.

### 5. Dry-run or no-op verification

If a real dry-run is available, use it.

If no real dry-run exists:
- Show target identity
- Show target storage
- Show image artifact
- Show checksum verification
- Show command preview
- Stop before execution

### 6. Recovery/reflash plan

Required:
- Known-good Raspberry Pi recovery image or installer media
- Recovery tool/method identified
- Physical access confirmed
- Method to reflash target storage if the test fails
- Expected post-recovery boot behavior
- Network recovery plan if UnifiPi does not return online

### 7. Network isolation plan

Required:
- State whether target will remain on main LAN, isolated VLAN, direct connection, or isolated switch
- Confirm no production service depends on UnifiPi
- Confirm Protectli / ns2 quantaa is not involved
- Confirm test can continue if UnifiPi goes offline

### 8. Rollback/failure plan

Required:
- Stop procedure if write fails
- Reflash or restore procedure
- Boot verification procedure
- Network verification procedure
- Failure documentation path
- Rule: do not attempt risky live fixes

### 9. Final approval phrase

Required exact phrase:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

No future write command may run unless the human operator enters the exact phrase during the future approved write phase.

## Phase 10AH success criteria

Phase 10AH passes when:
- Write-command preview fields are documented
- Required target identity fields are documented
- Required storage fields are documented
- Image/source artifact requirements are documented
- Recovery, network isolation, rollback, dry-run, and approval requirements are documented
- No image writing occurs
- No machine is modified
