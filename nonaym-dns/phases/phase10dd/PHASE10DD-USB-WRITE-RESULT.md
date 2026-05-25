# Nonaym DIY Phase 10DD — USB Write Result

Status: USB write completed

Date: 2026-05-25

## Summary

The approved Phase 10CY hardened USB write script was executed in Phase 10DD.

The Debian 13.5 amd64 netinst ISO was written to the approved USB target.

## Target

- USB device: /dev/sda
- Model: UDisk
- Size: 7.5G
- Transport: usb
- By-id resolved to: /dev/sda

## Protected system disk

The omnieon system disk was confirmed and not touched:

- /dev/nvme0n1
- Root: /dev/nvme0n1p3

## Preflight checks passed

- Local host guard: PASS
- ISO checksum verification: PASS
- Target device guard: PASS
- Root/system disk guard: PASS
- USB transport check: PASS
- Removable flag check: PASS
- Model check: PASS
- by-id check: PASS
- Target unmounted check: PASS
- Human approval phrase: PASS

## Write result

The script reported:

- 188+1 records in
- 188+1 records out
- 791674880 bytes copied
- 755 MiB written
- 73.3232 seconds
- 10.8 MB/s

## Post-write result

- sync completed
- no reboot performed
- script returned to non-executable mode after execution

## Operator notes / future UX improvements

During execution, the operator noted:

1. Because the approval phrase is in caps, the script should remind the user to turn off Caps Lock before entering any password.
2. The script should display a friendly progress/wait message, such as:
   "Writing USB installer. This may take a few minutes. Please wait."
3. Future customer-facing USB Creator should show a spinner/progress animation while writing.
4. Future customer flow should avoid raw terminal-style output and use beginner-friendly status messages.

## Safety status

- No action against nonaym5 occurred.
- No action against Protectli / ns2 quantaa occurred.
- No install occurred.
- No reboot occurred.
