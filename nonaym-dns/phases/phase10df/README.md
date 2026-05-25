# Nonaym DIY Phase 10DF — Lenovo nonaym5 USB Boot Planning

Status: Planning only / no reboot / no install

Purpose:
Plan the next step: boot Lenovo nonaym5 from the Debian 13.5 amd64 USB installer created in Phase 10DD.

This phase does not reboot nonaym5.
This phase does not install Debian.
This phase does not write to nonaym5 disk.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, disks, packages, or services.
This phase does not touch Protectli / ns2 quantaa.

## Prior result

Phase 10DD successfully created the Debian 13.5 amd64 netinst USB installer.

USB write result:
- USB device on omnieon during creation: /dev/sda
- ISO: Debian 13.5 amd64 netinst
- Write result: 791674880 bytes copied
- sync completed
- no reboot performed

Phase 10DE captured UX lessons:
- warn about Caps Lock before password entry
- show friendly progress/wait message
- future USB Creator should show progress/spinner animation
- customer-facing flow should avoid scary terminal wording

## Target machine

- Machine: Lenovo nonaym5
- Login user: nonaym5
- LAN IP before install: 192.168.1.217
- Hostname before install: nonaym5
- Architecture: x86_64
- Current disk: nvme0n1
- Current disk size: 238.5G
- Current disk model: SAMSUNG MZVLB256HAHQ-000L7
- Current boot mode observed: Legacy BIOS or unknown

## Boot goal

Boot nonaym5 from the newly created USB installer and confirm whether the Debian installer starts.

This phase is only for planning the boot test.

## Expected manual boot process

1. Insert the USB installer into Lenovo nonaym5.
2. Power on or restart nonaym5 manually.
3. Open boot menu.
4. Choose the USB drive.
5. Confirm Debian installer menu appears.
6. Stop and document what is shown before installing.

## Lenovo boot keys to try

Common Lenovo boot keys:

- F12: Boot menu
- Enter: Interrupt normal startup on some Lenovo models
- F1: BIOS setup on many ThinkCentre/ThinkPad systems
- F2: BIOS setup on some models

## Important stop point

If the Debian installer menu appears, do not proceed with disk partitioning or installation until a separate install phase is planned and approved.

## What to document during boot test

Capture by photo or notes:

- Does boot menu show the USB drive?
- What is the USB label/name?
- Does Debian installer start?
- Does it boot in BIOS/Legacy mode or UEFI mode?
- Does network get detected?
- Does internal disk show as expected?
- Any error message?

## Still forbidden in Phase 10DF

- No reboot.
- No install.
- No partitioning.
- No formatting.
- No disk write to nonaym5.
- No package installs.
- No DNS changes.
- No service changes.
- No action against Protectli / ns2 quantaa.

## Future Phase 10DG candidate

Phase 10DG should be a controlled manual USB boot test for Lenovo nonaym5.

Phase 10DG may allow manual reboot/boot-menu interaction, but still should not approve installation or disk partitioning unless separately gated.

## Success criteria

Phase 10DF passes when:
- boot plan is documented
- stop point before install is documented
- Lenovo boot keys are documented
- no machine is modified
