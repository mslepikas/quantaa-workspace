# Nonaym DIY Phase 10CN — USB Creator UX Plan for Lenovo nonaym5

Status: Product/UX planning only / no media write

Purpose:
Define the customer-friendly Nonaym DIY USB creation flow before any USB/media writing or Lenovo installation phase.

This phase does not write a USB drive.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not install packages.
This phase does not modify DNS, network settings, disks, packages, or services.
This phase does not reboot any machine.
This phase does not touch nonaym5.
This phase does not touch Protectli / ns2 quantaa.

## Product direction

The Nonaym DIY customer flow should be website-driven and beginner-friendly.

The customer should not be expected to run terminal commands like dd.

The intended customer experience:

1. Customer visits nonaym.ai.
2. Customer chooses Nonaym DIY.
3. Website explains what they need:
   - old computer or laptop
   - USB drive
   - internet connection
   - keyboard/monitor if needed
4. Customer downloads or opens the Nonaym DIY USB Creator.
5. USB Creator asks customer to select a USB drive.
6. USB Creator asks permission to inspect the selected USB drive.
7. USB Creator checks drive model, size, removability, and current mount state.
8. USB Creator shows a clear warning that the USB drive will be erased.
9. Customer explicitly approves writing the USB installer.
10. USB Creator downloads/verifies the installer artifact.
11. USB Creator writes the USB installer.
12. USB Creator verifies the write if practical.
13. Customer boots the target Lenovo/PC from the USB.
14. Customer follows guided install steps.
15. Future version may show a simple animation/progress guide for beginners.

## Wording correction

Use this customer wording:

- "Create your Nonaym DIY USB installer"

Avoid wording like:

- "download the USB"

The customer downloads a tool or installer image, then creates/writes the USB installer.

## Beginner-friendly requirements

The flow should use plain language:

- "Choose your USB drive"
- "We will check this drive first"
- "This USB drive will be erased"
- "Please confirm before we write"
- "Now restart your old computer and boot from USB"

Avoid scary or confusing wording where possible:

- dd
- block device
- partition table
- filesystem overwrite
- raw image write

Technical terms may appear only in an advanced/details section.

## USB inspection step

Before writing, the tool should ask permission to inspect the selected USB drive.

Inspection should identify:

- drive name/model
- drive size
- whether it appears removable
- current mountpoints
- whether it is large enough
- whether it appears to be the system disk
- whether it contains visible existing data/partitions

The inspection step must be read-only.

## USB approval step

Before writing, the customer must explicitly approve:

- selected USB drive
- drive size/model
- warning that all data on the USB drive will be erased
- confirmation that this is not their computer's internal disk

Approval should be separate from inspection.

## Artifact direction

Current test artifact:

- Debian 13.5 amd64 netinst ISO
- Architecture: amd64 / x86_64
- Intended for Lenovo nonaym5-style PC target testing

Future product artifact:

- Nonaym DIY USB installer
- likely based on Debian amd64
- should eventually include guided setup
- should avoid exposing raw Debian install complexity to customers

## Lenovo nonaym5 target profile

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

## Still forbidden in Phase 10CN

- No USB/media write.
- No ISO/image write.
- No disk partitioning.
- No formatting.
- No package installs.
- No reboot.
- No action against nonaym5 beyond planning.
- No action against Protectli / ns2 quantaa.

## Future phase direction

Phase 10CO should prepare Q/Danno review of this USB Creator UX/media-write plan.

After approval, later phases can split into two tracks:

### Track A — Technical test path

- create a Debian amd64 USB installer
- boot Lenovo nonaym5 from USB
- validate BIOS/boot flow
- document install friction

### Track B — Product path

- design Nonaym DIY USB Creator
- design website instructions
- design drive-selection safety checks
- design newbie-friendly progress animation
- eventually build the app/tool

## Phase 10CN success criteria

Phase 10CN passes when:
- USB Creator customer flow is documented.
- Read-only USB inspection step is documented.
- Explicit USB write approval step is documented.
- Lenovo/nonaym5 target profile is retained.
- Product language is clarified.
- No USB/media write occurs.
- No machine is modified.
