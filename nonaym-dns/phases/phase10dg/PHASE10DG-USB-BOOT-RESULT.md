# Nonaym DIY Phase 10DG — Lenovo USB Boot Test Result

Status: Passed / installer booted

Date: 2026-05-25

## Summary

The Lenovo nonaym5 was manually booted from the Debian 13.5 amd64 USB installer created in Phase 10DD.

The manual F12 boot-menu path worked.

## Observed result

- F12 presented a boot menu.
- The default USB boot option was selected.
- Debian installer started.
- Debian graphical installer menu appeared.
- Installer proceeded to language selection.
- Audio played through the internal speaker.
- No install was performed.
- No partitioning was performed.
- No formatting was performed.
- No disk write to nonaym5 was approved in this phase.

## Interpretation

This confirms:

- The USB installer was created successfully.
- Lenovo nonaym5 can boot from the USB installer.
- The Debian amd64 installer is compatible with the Lenovo/nonaym5 boot path.
- The pivot from Raspberry Pi/NVMe boot testing to Lenovo x86_64 PC-style testing was correct.

## Product lesson

This validates the future Nonaym DIY customer path:

1. Create USB installer.
2. Boot old computer from USB.
3. Present installer screen.
4. Continue only after a separate guided install phase.

## Stop point

Stop at the installer/language screen.

Do not proceed with:
- install
- disk partitioning
- formatting
- "use entire disk"
- package installation
- network/DNS changes

## Next phase

Phase 10DH should plan the Lenovo install-path decision and safety gate.

The next phase should decide whether the first install test will:
- proceed manually through Debian installer
- use entire Lenovo disk
- preserve anything
- require screenshots/photos
- require another Q/Danno gate before disk changes

## Safety status

- Protectli / ns2 quantaa / 10.1.1.109 was not touched.
- omnieon was not modified after USB creation.
- nonaym5 internal disk was not intentionally modified in Phase 10DG.
