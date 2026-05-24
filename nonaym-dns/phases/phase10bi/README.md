# Nonaym DIY Phase 10BI — Final Write-Command Preview Preparation

Status: Planning only / no write

Purpose:
Prepare the final write-command preview structure for Raspberry Pi / UnifiPi using the verified Raspberry Pi OS Lite artifact and the approved filled-in write-packet planning chain.

This phase does not write an image.
This phase does not flash USB, SD, or NVMe.
This phase does not partition disks.
This phase does not format disks.
This phase does not mount the image.
This phase does not install Nonaym DIY.
This phase does not modify DNS, network settings, packages, disks, or services.
This phase does not reboot any machine.

## Prior approval chain

- Phase 10BC: image downloaded and checksum verified.
- Phase 10BD: Q/Danno approved downloaded artifact provenance and checksum.
- Phase 10BE: image-write safety preparation created.
- Phase 10BF: Q/Danno approved image-write safety preparation.
- Phase 10BG: filled-in write-packet planning created.
- Phase 10BH: Q/Danno approved filled-in write-packet planning.

## Verified local artifact

- Image path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- Checksum path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256
- Provenance path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.PROVENANCE.md
- Image type: Raspberry Pi OS Lite 64-bit
- SHA256 verification result from Phase 10BC: PASS

## Intended future write target

- Hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Expected storage candidate: nvme0n1
- Expected storage model: SANZANG
- Expected storage size: 238.5G

All target details must be freshly reverified live before any future write command preview.

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
- no accidental reference in future write command

## Still forbidden in Phase 10BI

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

## Required live checks before a future final command preview

A later phase must collect fresh live read-only data from UnifiPi:

- hostname
- IP address
- architecture
- primary interface
- MAC address
- block device list
- mountpoints
- root filesystem
- target storage model
- target storage size
- confirmation target is not GB10 / omnieon
- confirmation target is not Protectli / ns2 quantaa
- confirmation operator accepts overwrite risk

## Final command-preview fields

A future final command-preview document must include:

- exact local image artifact path
- exact checksum file path
- checksum re-verification result immediately before preview
- exact target host
- exact target IP
- exact live MAC verification result
- exact target block device path
- exact decompression/write method
- exact write command preview
- explicit statement that command does not reference Protectli
- explicit statement that command does not reference GB10 / omnieon storage
- explicit stop point before execution
- Q approval
- Danno approval
- exact human approval phrase

## Required checksum re-verification

Before any final command preview, run local checksum verification again against the downloaded artifact.

The future preview phase must document:

- command used
- checksum file used
- image file checked
- result
- date/time
- operator

## Required target storage rule

The future write command must target only the intended UnifiPi storage device after live verification.

The expected target is:

- nvme0n1

But the future command must use the live device path confirmed at that moment.

Do not assume stale device identity.

## Final approval phrase

No future write command may run unless the human operator enters this exact phrase immediately before execution:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

## Future Phase 10BJ candidate

Phase 10BJ should create a Q/Danno review packet for this final write-command preview preparation.

If approved, a later phase may collect live target checks and prepare a final command preview.

No image should be written until:

- live target identity is reconfirmed
- live target storage is reconfirmed
- local artifact checksum is reverified
- final write-command preview is created
- Q approves final write-command preview
- Danno approves final write-command preview
- human enters exact approval phrase

## Phase 10BI success criteria

Phase 10BI passes when:

- Final command-preview fields are documented.
- Required live checks are documented.
- Checksum re-verification requirement is documented.
- Target storage rule is documented.
- Final approval phrase is documented.
- No runnable write command is included.
- No image writing occurs.
- No target machine is modified.
