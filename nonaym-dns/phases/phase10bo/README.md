# Nonaym DIY Phase 10BO — Executable Write-Command Preparation

Status: Command preparation only / no execution

Purpose:
Prepare the future executable write-command candidate for writing the verified Raspberry Pi OS Lite image to the verified UnifiPi NVMe target.

This phase prepares documentation only.

This phase does not execute the write command.
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
- Phase 10BM: final non-executable write preview created.
- Phase 10BN: Q/Danno approved final non-executable write preview.

## Verified local artifact

- Image path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- Checksum path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256
- Provenance path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.PROVENANCE.md
- Image type: Raspberry Pi OS Lite 64-bit
- SHA256 verification result from Phase 10BC: PASS

## Intended future write target

- Hostname: UnifiPi
- SSH user: mslepikas
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Target storage device candidate: /dev/nvme0n1
- Storage model: SANZANG
- Storage size: 238.5G

All target details must be freshly reverified before execution.

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

## Still forbidden in Phase 10BO

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

## Command candidate handling

The executable command candidate is documented in:

- PHASE10BO-WRITE-COMMAND-CANDIDATE.txt

That file is documentation only.
It must not be pasted into a terminal until a later reviewed execution phase.

## Required before any future execution

Before execution, a later phase must:

- Reverify local artifact checksum.
- Reconfirm live UnifiPi hostname.
- Reconfirm live UnifiPi IP.
- Reconfirm live UnifiPi MAC internally.
- Reconfirm live UnifiPi storage device path.
- Confirm target is not GB10 / omnieon.
- Confirm target is not Protectli / ns2 quantaa.
- Confirm physical access to UnifiPi.
- Confirm recovery/reflash path.
- Get Q approval of the executable command.
- Get Danno approval of the executable command.
- Require the human approval phrase immediately before execution.

## Final approval phrase

No future write command may run unless the human operator enters this exact phrase immediately before execution:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

## Phase 10BO success criteria

Phase 10BO passes when:

- README is documented.
- Executable command candidate is documented as text only.
- No command is executed.
- No image writing occurs.
- No target machine is modified.
