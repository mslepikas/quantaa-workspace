# Nonaym DIY Phase 10BE — Image-Write Safety Review Preparation

Status: Planning only / no write

Purpose:
Prepare the safety review packet for a future Raspberry Pi / UnifiPi image-write phase using the downloaded and checksum-verified Raspberry Pi OS Lite 64-bit artifact.

This phase does not write an image.
This phase does not flash USB, SD, or NVMe.
This phase does not partition disks.
This phase does not format disks.
This phase does not mount the image.
This phase does not install Nonaym DIY.
This phase does not modify DNS, network settings, packages, disks, or services.
This phase does not reboot any machine.

## Approved artifact context

Downloaded and checksum-verified in Phase 10BC:

- Artifact folder: nonaym-dns/artifacts/raspios-lite-64bit-20260421/
- Image: nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- Checksum file: nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256
- Provenance file: nonaym-diy-rpi-base-raspios-lite-64bit-20260421.PROVENANCE.md
- SHA256 result: PASS
- Image remains local artifact only
- Large image is excluded from Git

## Future write target

Future approved test target:

- Hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Current storage candidate: nvme0n1
- Current root partition observed earlier: nvme0n1p2 mounted at /
- Role: Raspberry Pi overwrite/install test target after final approval

## Protected production target

The following machine remains no-write production:

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- Rule: no write, no script copy, no reboot, no DNS/network/service changes, no install testing

## Still forbidden in Phase 10BE

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

## Required future live pre-write checks

Before any future write command may be shown for final approval, the operator must perform live read-only checks against UnifiPi:

- Confirm hostname is UnifiPi.
- Confirm IP is 10.1.1.102.
- Confirm architecture is aarch64.
- Confirm primary interface and MAC match the stored internal identity record.
- Confirm target is not GB10 / omnieon.
- Confirm target is not Protectli / ns2 quantaa.
- Confirm storage device list.
- Confirm intended target block device.
- Confirm whether nvme0n1 is still the correct target.
- Confirm no needed data remains on target storage.
- Confirm operator accepts overwrite risk.

## Required future write packet fields

A future write packet must include:

- Exact local image artifact path.
- Exact checksum file path.
- Fresh checksum verification result.
- Exact target host.
- Exact target IP.
- Exact target MAC verification result.
- Exact target block device.
- Exact command preview.
- Explicit statement that command does not reference Protectli.
- Explicit statement that command does not reference GB10 / omnieon storage.
- Recovery/reflash plan.
- Network isolation plan.
- Rollback/failure plan.
- Final human approval phrase.

## Required final approval phrase

No future write command may run unless the human operator enters this exact phrase immediately before execution:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

## Recovery/reflash requirements

Before any future write:

- Physical access to UnifiPi must be confirmed.
- Known-good Raspberry Pi recovery path must be available.
- Reflash method must be documented.
- Network recovery plan must be documented.
- Operator must accept that UnifiPi may become temporarily unbootable.
- Failure must be documented without risky live fixes.

## Network isolation requirements

Before any future write:

- Confirm UnifiPi can safely go offline.
- Confirm no production service depends on UnifiPi.
- Confirm Protectli / ns2 quantaa is not involved.
- Confirm test is isolated enough for the planned risk level.
- Confirm no customer/public service depends on this device.

## Future Phase 10BF candidate

Phase 10BF should create a Q/Danno review packet for this image-write safety preparation.

If approved, a later phase may prepare a filled-in write-command preview.

No image should be written until:

- live target identity is reconfirmed
- live target storage is reconfirmed
- local artifact checksum is reverified
- Q approves the filled write packet
- Danno approves the filled write packet
- human enters exact approval phrase

## Phase 10BE success criteria

Phase 10BE passes when:

- Image-write safety requirements are documented.
- Future live pre-write checks are documented.
- Future write packet fields are documented.
- Recovery, network isolation, and rollback requirements are documented.
- Final approval phrase is documented.
- No image writing occurs.
- No target machine is modified.
