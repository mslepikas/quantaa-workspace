# Nonaym DIY Phase 10AD — Raspberry Pi Install-Capable Planning

Status: Planning only

Purpose:
Prepare the first install-capable planning phase for Raspberry Pi / UnifiPi, without writing images or changing disks yet.

This phase does not install Nonaym DIY.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Target

- Machine name/hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Hardware class: Raspberry Pi / ARM
- Role: first approved future overwrite/install-capable test target

## Current approval status

The user confirmed Raspberry Pi / UnifiPi is not production and may be overwritten for future Nonaym DIY testing.

This does not approve writing in Phase 10AD.

Phase 10AD is planning only.

## Production no-write machine

The following machine remains no-write production:

- Protectli 2420
- Host/role: ns2 quantaa
- LAN IP: 10.1.1.109
- Status: production
- Rule: no write, no script copy, no /tmp report, no reboot, no DNS/network/service changes, no install testing

## Phase 10AD allowed actions

- Document the future Raspberry Pi install-test plan.
- Define safety checks before writing.
- Define recovery/reflash requirements.
- Define target confirmation steps.
- Define what Q and Danno must review before any image writing.
- Prepare a future checklist for Phase 10AE.

## Still forbidden in Phase 10AD

- No image writing.
- No USB/SD/NVMe flashing.
- No disk partitioning.
- No formatting.
- No package installation.
- No DNS changes.
- No service changes.
- No network reconfiguration.
- No reboot.
- No write action against Protectli / ns2 quantaa.
- No install-capable script execution.

## Required safety checks before future image writing

Before any future install-capable phase may write to Raspberry Pi / UnifiPi:

1. Confirm the target is exactly UnifiPi / 10.1.1.102.
2. Confirm the user still approves overwriting the device.
3. Confirm the target is not production.
4. Confirm there is no needed data on the target storage.
5. Confirm a recovery/reflash path exists.
6. Confirm the target storage device to be written.
7. Confirm no Protectli / ns2 quantaa commands are involved.
8. Confirm network isolation scope.
9. Confirm rollback plan if writing fails.
10. Confirm MAC/IP binding if needed to avoid wrong-target actions.
11. Run Q technical review.
12. Run Danno safety review.
13. Require explicit human approval immediately before write action.

## Future Phase 10AE candidate

Phase 10AE should be a Q/Danno-reviewed Raspberry Pi install-test checklist.

It should still stop before actual writing unless the human explicitly approves the final write command.

Phase 10AE should include:

- Exact image/source artifact to be written
- Exact target storage device
- Exact command preview
- Dry-run or no-op verification if available
- Expected post-write boot behavior
- Recovery path
- Rollback plan
- Redaction/privacy checklist
- Human approval phrase

## Success criteria

Phase 10AD passes when:

- Raspberry Pi / UnifiPi is documented as the first future overwrite-capable target.
- Protectli remains documented as no-write production.
- The future install-capable safety gate is documented.
- No install behavior is added.
- No machine is modified.
