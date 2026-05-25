# Nonaym DIY Phase 10DA — Harden Final USB Write Script After Danno Caution

Status: Script hardening only / no execution / no media write

Purpose:
Address Danno's Phase 10CZ CAUTION items before any USB write execution phase.

This phase does not execute the script.
This phase does not chmod the script executable.
This phase does not write a USB drive.
This phase does not write an image.
This phase does not flash USB or NVMe.
This phase does not partition disks.
This phase does not format disks.
This phase does not install packages.
This phase does not modify DNS, network settings, disks, packages, or services.
This phase does not reboot any machine.
This phase does not touch nonaym5.
This phase does not touch Protectli / ns2 quantaa.

## Phase 10CZ review result

- Q: PASS
- Danno: CAUTION

Danno did not identify a wrong-device safety failure.

Danno caution items:
- Add explicit udisksctl availability check before unmount.
- Avoid hard failure on exact USB model string where possible.
- Avoid hard failure if by-id path changes due to port/hub variation.
- Keep by-id as strong confirmation when present.
- Prefer absolute workspace path.
- Keep exact approval phrase and system-disk guards.

## Hardening approach

The script should be updated so that:

1. WORKSPACE is absolute.
2. ISO and SHA paths are absolute or based on WORKSPACE.
3. udisksctl availability is checked before unmount.
4. Model mismatch becomes CAUTION text, not an immediate stop.
5. by-id verification becomes:
   - PASS if present and resolves to target.
   - CAUTION if missing.
   - STOP if present but resolves to a different device.
6. USB transport/removable/root-disk checks remain hard stops.
7. /dev/nvme0n1 remains hard-blocked.
8. Exact approval phrase remains required.
9. Script remains non-executable.

## Still forbidden

- No script execution.
- No chmod +x.
- No USB/media write.
- No partitioning.
- No formatting.
- No install.
- No reboot.
