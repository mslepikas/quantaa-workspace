# Nonaym DIY Phase 10BS — Final Executable Packet Preparation

Status: Final executable packet preparation / no execution

Purpose:
Prepare the final execution packet for the future Raspberry Pi / UnifiPi image write, incorporating Phase 10BR Q/Danno-approved hardening.

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
- Phase 10BO: executable write-command candidate prepared.
- Phase 10BP: Q/Danno approved executable write-command candidate.
- Phase 10BQ: hardened pre-execution structure prepared.
- Phase 10BR: Q/Danno approved hardened pre-execution structure.

## Verified local artifact

- Image path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- Checksum path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256
- Provenance path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.PROVENANCE.md
- Image type: Raspberry Pi OS Lite 64-bit
- SHA256 verification result from Phase 10BC: PASS

## Intended write target

- Hostname: UnifiPi
- SSH user: mslepikas
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Target device candidate: /dev/nvme0n1
- Storage model: SANZANG
- Storage size: 238.5G

All target details must be freshly verified immediately before any execution.

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
- no accidental reference in execution command

## Still forbidden in Phase 10BS

- No command execution.
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

## Final execution packet

The final execution packet is documented in:

- PHASE10BS-FINAL-EXECUTION-PACKET.txt

That file is documentation only in Phase 10BS.

It must not be pasted into a terminal until:
- Phase 10BT Q review approves it.
- Phase 10BT Danno review approves it.
- Human operator approves moving to execution.
- Human operator enters the exact final approval phrase.

## Final approval phrase

No future write command may run unless the human operator enters this exact phrase immediately before execution:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

## Phase 10BS success criteria

Phase 10BS passes when:

- Final execution packet is documented.
- Live check commands are included in the packet.
- Protected target rejection checks are included in the packet.
- Final human approval phrase is included.
- No command is executed.
- No image writing occurs.
- No target machine is modified.
