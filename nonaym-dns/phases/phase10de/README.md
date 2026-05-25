# Nonaym DIY Phase 10DE — USB Write Script UX Hardening Notes

Status: UX/documentation only / no media write

Purpose:
Capture operator lessons from the successful Phase 10DD USB write and convert them into future USB Creator/script UX requirements.

This phase does not execute the script.
This phase does not chmod the script executable.
This phase does not write a USB drive.
This phase does not write an image.
This phase does not flash USB or NVMe.
This phase does not partition disks.
This phase does not format disks.
This phase does not install packages.
This phase does not reboot any machine.
This phase does not touch nonaym5.
This phase does not touch Protectli / ns2 quantaa.

## Prior result

Phase 10DD successfully wrote the Debian 13.5 amd64 netinst ISO to the approved USB target:

- USB device: /dev/sda
- Model: UDisk
- Size: 7.5G
- Transport: usb
- Write result: 791674880 bytes copied
- sync completed
- no reboot performed

## Operator UX lessons

During Phase 10DD execution, the operator observed:

1. Because the approval phrase is uppercase, it may leave Caps Lock on or create password-entry confusion.
2. The script should remind the operator to check Caps Lock before password entry.
3. The write step should show a friendly wait/progress message before the raw write begins.
4. The future customer-facing USB Creator should show a spinner or progress animation.
5. The customer version should avoid raw terminal-style output.

## Script UX requirement 1 — Caps Lock warning

Before any password prompt or sudo operation, future scripts should display:

"Check that Caps Lock is OFF before entering your password."

This is especially important after typed approval phrases that use uppercase text.

## Script UX requirement 2 — Friendly write wait message

Before the write begins, future scripts should display:

"Writing your USB installer. This may take a few minutes. Please wait and do not remove the USB drive."

## Script UX requirement 3 — Progress/spinner

Future script or USB Creator should show progress in a beginner-friendly way.

Possible wording:
- Checking USB drive...
- Verifying installer...
- Preparing USB...
- Writing USB installer...
- Finishing and syncing...
- Complete. Your USB installer is ready.

## Script UX requirement 4 — Product UI animation

Future Nonaym DIY USB Creator may include a simple animation with stages:

1. Choose USB drive
2. Check USB drive
3. Verify installer
4. Create USB installer
5. Finish safely
6. Restart old computer
7. Boot from USB

## Script UX requirement 5 — Customer-safe language

Customer-facing language should avoid:

- dd
- block device
- raw image
- filesystem overwrite
- partition table
- destructive write

Use plain language instead:

- USB drive
- installer
- erase USB
- create USB installer
- please wait
- finished

## Carry-forward implementation note

The technical script may still use Linux-native tooling internally, but the customer-facing USB Creator should hide that complexity.

## Still forbidden in Phase 10DE

- No USB/media write.
- No ISO/image write.
- No partitioning.
- No formatting.
- No install.
- No reboot.
- No action against nonaym5.
- No action against Protectli / ns2 quantaa.

## Future phase

Phase 10DF should plan booting Lenovo nonaym5 from the newly created Debian USB installer.
