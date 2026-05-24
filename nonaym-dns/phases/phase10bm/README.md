# Nonaym DIY Phase 10BM — Final Write-Command Preview Creation

Status: Preview only / no execution / no runnable write command

Purpose:
Create the final Raspberry Pi / UnifiPi write-command preview packet using the verified image artifact and live target verification results.

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
- Phase 10BI: final write-command preview preparation created.
- Phase 10BJ: Q/Danno approved final write-command preview preparation.
- Phase 10BK: live read-only UnifiPi verification completed.
- Phase 10BL: Q/Danno approved live UnifiPi verification.

## Verified local artifact

- Image path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- Checksum path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256
- Provenance path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.PROVENANCE.md
- Image type: Raspberry Pi OS Lite 64-bit
- SHA256 verification result from Phase 10BC: PASS

## Latest live target verification

Confirmed in Phase 10BK:

- Hostname: UnifiPi
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Primary interface: eth0
- MAC address: confirmed internally only
- Main storage device: nvme0n1
- Storage size: 238.5G
- Storage model: SANZANG
- Root partition before overwrite: /dev/nvme0n1p2 mounted at /
- Boot firmware partition before overwrite: /dev/nvme0n1p1 mounted at /boot/firmware

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
- no accidental reference in any future write command

## Still forbidden in Phase 10BM

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

## Required immediate pre-execution checks for a later phase

Before any actual write execution, a later phase must again confirm:

- live hostname is UnifiPi
- live IP is 10.1.1.102
- live architecture is aarch64
- live MAC matches internal UnifiPi binding
- live storage device is the intended UnifiPi storage
- target is not GB10 / omnieon
- target is not Protectli / ns2 quantaa
- local artifact checksum is reverified
- physical access to UnifiPi is available
- recovery/reflash path is ready
- UnifiPi can safely become temporarily unbootable
- human operator enters the exact approval phrase

## Non-executable write-method preview

This is NOT a shell command.

Method preview only:

1. Reverify local SHA256 for the downloaded Raspberry Pi OS Lite image.
2. Reconfirm live UnifiPi identity over read-only checks.
3. Reconfirm live UnifiPi storage device path.
4. Decompress the local image artifact.
5. Write decompressed image bytes to the live-confirmed UnifiPi target storage device only.
6. Flush/sync writes.
7. Stop and document result.
8. Do not involve Protectli / ns2 quantaa.
9. Do not involve GB10 / omnieon storage as a target.

No runnable write command is included in Phase 10BM.

## Final approval phrase

No future write command may run unless the human operator enters this exact phrase immediately before execution:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

## Recovery plan reminder

Before any future execution:

- Confirm physical access to UnifiPi.
- Confirm known-good Raspberry Pi recovery media/path.
- Confirm reflash method.
- Confirm network recovery method.
- Accept that UnifiPi may become temporarily unbootable.
- Do not attempt risky live fixes if the write fails.

## Future Phase 10BN candidate

Phase 10BN should create a Q/Danno review packet for this final non-executable write-command preview.

If approved, a later phase may prepare an executable command only after a final live check and final human approval gate.

No image should be written until:

- live target identity is reconfirmed
- live target storage is reconfirmed
- local artifact checksum is reverified
- final executable command is reviewed
- Q approves final executable command
- Danno approves final executable command
- human enters exact approval phrase

## Phase 10BM success criteria

Phase 10BM passes when:

- Final preview packet is created.
- Artifact fields are filled in.
- Live target fields are filled in from Phase 10BK.
- Non-executable write-method preview is documented.
- Final approval phrase is documented.
- No runnable write command is included.
- No image writing occurs.
- No target machine is modified.
