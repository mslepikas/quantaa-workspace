# Nonaym DIY Phase 10CS — Read-Only USB Inventory on omnieon

Status: Read-only inventory / no media write

Purpose:
Collect read-only USB/storage inventory on omnieon after inserting the intended USB drive for a future Debian amd64 installer media-write test.

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

## Prior plan

Phase 10CR designed the controlled USB media-write test.

Required safety principles:
- read-only inspection before approval
- block system/root disks
- identify USB drive clearly
- handle ambiguous removable detection carefully
- do not write until a later reviewed write phase

## Phase 10CS allowed actions

- list block devices
- identify current root filesystem
- identify current root parent disk
- identify USB/removable candidates
- record model, size, transport, removable flag, and mountpoints
- document whether a candidate USB appears safe for future review

## Still forbidden

- No USB/media write.
- No ISO/image write.
- No disk partitioning.
- No formatting.
- No package installs.
- No reboot.
- No action against nonaym5.
- No action against Protectli / ns2 quantaa.

## Success criteria

Phase 10CS passes when:
- omnieon storage inventory is captured.
- current root/system disk is identified.
- candidate USB device, if present, is identified.
- no write occurs.
- no machine is modified.
