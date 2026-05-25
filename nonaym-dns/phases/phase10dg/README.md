# Nonaym DIY Phase 10DG — Controlled Manual USB Boot Test for Lenovo nonaym5

Status: Manual boot test only / no install

Purpose:
Perform a controlled manual boot test of Lenovo nonaym5 using the Debian 13.5 amd64 USB installer created in Phase 10DD.

This phase allows manual reboot/boot-menu interaction only.

This phase does not approve installation.
This phase does not approve partitioning.
This phase does not approve formatting.
This phase does not approve writing to the internal nonaym5 NVMe disk.
This phase does not approve package installation.
This phase does not approve DNS/network/service changes.
This phase does not touch Protectli / ns2 quantaa.

## Prior result

Phase 10DD successfully wrote Debian 13.5 amd64 netinst ISO to the approved USB drive.

Phase 10DF planned the Lenovo nonaym5 USB boot test.

## Target machine

- Machine: Lenovo nonaym5
- Login user before install: nonaym5
- LAN IP before install: 192.168.1.217
- Hostname before install: nonaym5
- Architecture: x86_64
- Current internal disk: nvme0n1
- Current disk size: 238.5G
- Current disk model: SAMSUNG MZVLB256HAHQ-000L7
- Boot mode observed before test: Legacy BIOS or unknown

## Manual boot test procedure

1. Safely remove/eject the USB installer from omnieon.
2. Insert the USB installer into Lenovo nonaym5.
3. Restart or power on nonaym5 manually.
4. Use the Lenovo boot menu.
5. Select the USB installer.
6. Confirm whether Debian installer menu appears.
7. Stop at installer menu or first installer screen.
8. Do not proceed with install.
9. Document result.

## Boot keys to try

- F12: Boot menu
- Enter: Interrupt normal startup on some Lenovo systems
- F1: BIOS setup
- F2: BIOS setup on some models

## Stop point

If the Debian installer menu appears, STOP.

Do not choose install options that partition or write to disk.

## What to document

- Did the Lenovo show the USB in boot menu?
- USB label/name shown in boot menu
- Did Debian installer start?
- BIOS/Legacy or UEFI indication, if visible
- Any error message
- Whether keyboard works
- Whether network detection screen appears
- Whether internal disk is shown, if visible

## Still forbidden in Phase 10DG

- No install.
- No partitioning.
- No formatting.
- No disk write to nonaym5.
- No package installs.
- No DNS changes.
- No service changes.
- No action against Protectli / ns2 quantaa.

## Success criteria

Phase 10DG passes if:
- USB boot menu path is tested.
- Debian installer boot result is documented.
- No install/disk write occurs.
