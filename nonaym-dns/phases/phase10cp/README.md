# Nonaym DIY Phase 10CP — USB Creator Functional Requirements and Safe Media-Write Design

Status: Functional requirements / design only / no media write

Purpose:
Define the functional requirements and safety design for the future Nonaym DIY USB Creator before any USB/media writing implementation.

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

## Prior approval

Phase 10CO reviewed and approved the Phase 10CN USB Creator UX/media-write safety plan.

Key approved direction:
- Beginner-friendly website-driven flow.
- Customer should not use terminal/dd commands.
- Read-only USB inspection comes before write approval.
- Explicit erase warning is required.
- System disks must be blocked, not merely warned.
- Ambiguous removable-drive detection needs secondary confirmation.
- Future media-write/install phases remain separately gated.

## Product goal

The Nonaym DIY customer experience should feel like:

1. Visit nonaym.ai.
2. Choose Nonaym DIY.
3. Read simple requirements.
4. Download/open Nonaym DIY USB Creator.
5. Select a USB drive.
6. Allow read-only inspection.
7. Confirm the selected USB is safe and large enough.
8. Approve erasing the USB.
9. Create the Nonaym DIY USB installer.
10. Boot the old computer from USB.
11. Follow guided install steps.

## Customer-facing wording

Use:
- Create your Nonaym DIY USB installer
- Choose your USB drive
- We will check this drive first
- This USB drive will be erased
- Confirm before we write
- Restart your old computer and boot from USB

Avoid:
- dd
- block device
- raw image
- partition table
- filesystem overwrite
- destructive write

Advanced details may be hidden under an advanced/details section.

## Functional requirement 1 — Welcome and readiness screen

The USB Creator should show:

- What Nonaym DIY does
- What the customer needs
- USB drive minimum size
- Warning that USB creation erases the USB
- Reminder not to select the computer's internal drive
- Link to help/video/animation

## Functional requirement 2 — Drive selection

The USB Creator should list candidate removable drives with:

- friendly drive name
- drive size
- model/vendor if available
- connection type if available
- removable status if available
- current mountpoints
- warning badges if ambiguous

The customer must select one drive.

## Functional requirement 3 — Read-only inspection

Before any write approval, the tool must inspect the selected drive read-only.

Required inspection fields:
- device path
- size
- model
- serial if safely available
- removable flag
- transport type
- mountpoints
- partition count
- whether it appears to be the system disk
- whether it appears to contain the current OS/root filesystem
- whether size is adequate
- whether selection is ambiguous

## Functional requirement 4 — System-disk blocking

The tool must block, not merely warn, if the selected drive appears to be:

- current system disk
- current boot disk
- current root filesystem parent
- internal OS disk
- known protected drive
- too large in a way that suggests an internal disk, unless explicitly handled by an advanced mode later

The customer should not be able to approve writing to the active system disk.

## Functional requirement 5 — Ambiguous-drive handling

If removability or transport detection is ambiguous, the tool should:

- show a stronger warning
- require secondary confirmation
- ask the customer to physically unplug/replug the USB drive if needed
- compare before/after drive inventory
- only allow write when the intended USB can be confidently identified

## Functional requirement 6 — Download and checksum

The tool should:

- download the official/current Nonaym DIY installer artifact
- verify checksum before writing
- show progress in plain language
- stop if verification fails
- never write an unverified artifact

Current test artifact:
- Debian 13.5 amd64 netinst ISO
- Verified in Phase 10CL
- For technical test only, not final customer product artifact

## Functional requirement 7 — Final erase approval

Before writing, show:

- selected drive name/model
- selected drive size
- selected drive path only in advanced/details
- clear erase warning
- confirmation checkbox or typed phrase
- "I understand this USB drive will be erased"

The approval must be separate from the inspection step.

## Functional requirement 8 — Media write

When approved in a later implementation phase, the tool should:

- unmount selected USB partitions safely
- write the installer artifact to the selected USB
- sync/flush safely
- optionally verify the written media if practical
- stop after USB creation
- not reboot the computer automatically

## Functional requirement 9 — Post-write instructions

After USB creation, show beginner instructions:

- leave USB plugged in
- restart the old computer
- press boot menu key
- choose the USB drive
- follow Nonaym DIY install steps
- remove USB only when instructed

For Lenovo/nonaym5-style PCs, include common boot keys:
- F12 boot menu
- F1/F2 BIOS setup depending on Lenovo model

## Functional requirement 10 — Beginner progress animation

Future UI may include a simple animation with stages:

1. Check your USB drive
2. Download installer
3. Verify download
4. Create USB installer
5. Restart old computer
6. Boot from USB
7. Install Nonaym
8. Finish setup

Animation should be helpful, not distracting.

## Technical test path versus product path

### Track A — Technical test path

Use Debian amd64 netinst ISO to validate:
- USB creation
- Lenovo boot menu
- installer boot
- basic install behavior

### Track B — Product path

Design/build:
- Nonaym DIY USB Creator
- website instructions
- safer drive selection
- guided install
- progress animation
- future custom Nonaym installer artifact

## nonaym5 target profile

- Machine: Lenovo nonaym5
- Login user: nonaym5
- LAN IP: 192.168.1.217
- Architecture: x86_64
- Storage: nvme0n1
- Storage size: 238.5G
- Storage model: SAMSUNG MZVLB256HAHQ-000L7
- Boot mode observed: Legacy BIOS or unknown

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

## Still forbidden in Phase 10CP

- No USB/media write.
- No ISO/image write.
- No disk partitioning.
- No formatting.
- No package installs.
- No reboot.
- No action against nonaym5 beyond planning.
- No action against Protectli / ns2 quantaa.

## Future Phase 10CQ candidate

Phase 10CQ should prepare Q/Danno review of these USB Creator functional requirements and safe media-write design.

After approval, later phases can plan a controlled technical USB-write test using a clearly identified removable USB device.

## Phase 10CP success criteria

Phase 10CP passes when:
- USB Creator functional requirements are documented.
- System-disk blocking requirement is documented.
- Ambiguous-drive handling is documented.
- Inspection and approval separation is documented.
- Download/checksum requirements are documented.
- Post-write beginner instructions are documented.
- No USB/media write occurs.
- No machine is modified.
