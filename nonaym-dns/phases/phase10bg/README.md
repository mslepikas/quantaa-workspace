# Nonaym DIY Phase 10BG — Filled-In Write-Packet Planning

Status: Planning only / no write

Purpose:
Create the first filled-in Raspberry Pi / UnifiPi write-packet planning document using the verified Raspberry Pi OS Lite artifact and known UnifiPi target details.

This phase does not write an image.
This phase does not flash USB, SD, or NVMe.
This phase does not partition disks.
This phase does not format disks.
This phase does not mount the image.
This phase does not install Nonaym DIY.
This phase does not modify DNS, network settings, packages, disks, or services.
This phase does not reboot any machine.

## Artifact

Downloaded and checksum-verified in Phase 10BC:

- Artifact folder: nonaym-dns/artifacts/raspios-lite-64bit-20260421/
- Image: nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- Checksum file: nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256
- Provenance file: nonaym-diy-rpi-base-raspios-lite-64bit-20260421.PROVENANCE.md
- SHA256 verification: PASS
- Image type: Raspberry Pi OS Lite 64-bit
- Debian version: 13 / trixie
- Kernel version: 6.12

## Future write target

Known from Phase 10AI:

- Hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Primary interface: eth0
- Primary MAC: stored internally only
- Storage candidate: nvme0n1
- Storage size: 238.5G
- Storage model: SANZANG
- Current root partition before future write: nvme0n1p2 mounted at /
- Current boot firmware partition before future write: nvme0n1p1 mounted at /boot/firmware

Before any future write, all target details must be rechecked live.

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

## Still forbidden in Phase 10BG

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

## Future live pre-write verification required

Before any future write-command preview can be approved, collect fresh live read-only output from UnifiPi:

- hostname
- IP address
- architecture
- primary interface
- MAC address
- block device list
- mountpoints
- root filesystem
- confirmation target is not GB10 / omnieon
- confirmation target is not Protectli / ns2 quantaa
- confirmation target storage is the intended storage device
- confirmation operator accepts overwrite risk

## Filled-in future packet fields

### Artifact path

- Image path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- Checksum path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256
- Provenance path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.PROVENANCE.md

### Target identity

- Target host: UnifiPi
- Target IP: 10.1.1.102
- Target user: mslepikas
- Target architecture: aarch64
- Target MAC: internal-only, must be live verified

### Target storage

- Expected target block device: nvme0n1
- Expected storage model: SANZANG
- Expected storage size: 238.5G

Important:
The future write command must use the correct device path as seen live on UnifiPi.
Do not assume the device path without live re-verification.

## Future command-preview requirements

A future command-preview phase must include:

- exact image source path
- exact target device path
- exact decompression/write method
- exact checksum re-verification immediately before preview
- exact target identity check
- exact target storage check
- explicit statement that command does not reference Protectli
- explicit statement that command does not reference GB10 / omnieon storage
- explicit stop point before execution
- Q approval
- Danno approval
- exact human approval phrase

No runnable write command is included in Phase 10BG.

## Final approval phrase

No future write command may run unless the human operator enters this exact phrase immediately before execution:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

## Recovery plan required before future write

Before any future write:

- Confirm physical access to UnifiPi.
- Confirm known-good Raspberry Pi recovery path.
- Confirm reflash method.
- Confirm network recovery method.
- Confirm UnifiPi may become temporarily unbootable.
- Confirm no risky live fixes will be attempted.

## Network isolation required before future write

Before any future write:

- Confirm UnifiPi can safely go offline.
- Confirm no production service depends on UnifiPi.
- Confirm Protectli / ns2 quantaa is not involved.
- Confirm no customer/public service depends on UnifiPi.
- Confirm isolation is sufficient for the risk level.

## Future Phase 10BH candidate

Phase 10BH should create a Q/Danno review packet for this filled-in write-packet planning document.

If approved, a later phase may prepare a final write-command preview.

No image should be written until:

- live target identity is reconfirmed
- live target storage is reconfirmed
- local artifact checksum is reverified
- Q approves final write packet
- Danno approves final write packet
- human enters exact approval phrase

## Phase 10BG success criteria

Phase 10BG passes when:

- Artifact path fields are filled in.
- Target identity fields are filled in.
- Target storage fields are filled in.
- Future live verification requirements are documented.
- Recovery, isolation, and approval requirements are documented.
- No runnable write command is included.
- No image writing occurs.
- No target machine is modified.
