# Nonaym DIY Phase 10BQ — Final Pre-Execution Verification and Command Hardening

Status: Planning / hardening only / no execution

Purpose:
Prepare a hardened final execution packet structure for the future Raspberry Pi / UnifiPi image write, incorporating Phase 10BP Q/Danno findings.

This phase does not execute the write command.
This phase does not write an image.
This phase does not flash USB, SD, or NVMe.
This phase does not partition disks.
This phase does not format disks.
This phase does not mount the image.
This phase does not install Nonaym DIY.
This phase does not modify DNS, network settings, packages, disks, or services.
This phase does not reboot any machine.

## Prior approval

Phase 10BP reviewed and approved the executable write-command candidate.

Danno non-blocking observations from Phase 10BP:
- conv=fsync may not provide meaningful NVMe flush behavior in this remote write pattern.
- status=progress may mix with SSH stderr and complicate logging.
- A future execution phase should include a fresh live hostname check before proceeding.

## Hardening goals

Before any future execution phase:

- Reverify local SHA256.
- Reconfirm live hostname is UnifiPi.
- Reconfirm live IP is 10.1.1.102.
- Reconfirm live architecture is aarch64.
- Reconfirm live storage device exists as /dev/nvme0n1.
- Reconfirm live storage model is SANZANG.
- Reconfirm target is not Protectli / ns2 quantaa.
- Reconfirm target is not GB10 / omnieon.
- Preserve final human approval phrase.
- Keep command as documentation only until final execution phase.

## Verified local artifact

- Image path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- Checksum path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256
- Provenance path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.PROVENANCE.md

## Intended target

- Hostname: UnifiPi
- SSH user: mslepikas
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Target device candidate: /dev/nvme0n1
- Storage model: SANZANG
- Storage size: 238.5G

All target details must be freshly verified immediately before execution.

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

## Still forbidden in Phase 10BQ

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

## Hardened future execution structure

A later execution phase should use this structure:

1. Set variables for artifact path, checksum path, target user, target IP, and target device.
2. Verify local SHA256.
3. Run live read-only hostname check.
4. Run live read-only architecture check.
5. Run live read-only block-device check.
6. Confirm hostname equals UnifiPi.
7. Confirm architecture equals aarch64.
8. Confirm target block device exists.
9. Confirm target block device model equals SANZANG.
10. Confirm target IP is 10.1.1.102.
11. Confirm target is not Protectli / ns2 quantaa.
12. Confirm target is not GB10 / omnieon.
13. Require exact human approval phrase.
14. Only then execute the image write.
15. Stop after write completes.
16. Do not reboot in the same phase unless separately approved.

## Command hardening decisions

- Keep checksum verification immediately before write.
- Add live hostname check before write.
- Add live architecture check before write.
- Add live block-device/model check before write.
- Remove status=progress if clean logging is more important than progress display.
- Avoid relying on conv=fsync as the main safety flush for NVMe.
- Use a post-write sync on the remote target only if reviewed and approved.
- Do not add reboot to the write command.

## Final approval phrase

No future write command may run unless the human operator enters this exact phrase immediately before execution:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

## Future Phase 10BR candidate

Phase 10BR should create Q/Danno review requests for this hardened pre-execution structure.

If approved, a later phase may prepare the final executable execution packet.

No image should be written until:

- local artifact checksum is reverified
- live target identity is reconfirmed
- live target storage is reconfirmed
- final executable packet is reviewed
- Q approves final executable packet
- Danno approves final executable packet
- human enters exact approval phrase

## Phase 10BQ success criteria

Phase 10BQ passes when:

- Pre-execution hardening requirements are documented.
- Danno Phase 10BP observations are addressed.
- Required live checks are documented.
- Final approval phrase is preserved.
- No runnable execution command is included.
- No image writing occurs.
- No target machine is modified.
