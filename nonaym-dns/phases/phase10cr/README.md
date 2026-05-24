# Nonaym DIY Phase 10CR — Controlled USB Media-Write Test Design

Status: Design only / no media write

Purpose:
Design the first controlled USB media-write test for the Debian amd64 netinst ISO, using the USB Creator safety principles approved in Phase 10CQ.

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

Phase 10CQ approved the USB Creator functional requirements and safe media-write design.

Key requirements:
- read-only inspection before approval
- system disks must be blocked
- ambiguous drives require secondary confirmation
- erase warning must be clear
- write approval must be separate from inspection
- customer-facing flow must avoid dd/terminal language
- media-write and install phases remain separately gated

## Test objective

Prepare a controlled technical test for creating a Debian amd64 installer USB.

This is not yet the final customer USB Creator.

The goal is to validate:
- USB inspection workflow
- USB candidate selection
- system-disk blocking logic
- removable-drive detection
- ISO checksum re-verification
- explicit approval before write
- safe media-write command structure
- post-write stop point

## Test artifact

Downloaded and verified in Phase 10CL:

- Artifact: debian-13.5.0-amd64-netinst.iso
- Location: nonaym-dns/artifacts/debian-amd64-netinst-trixie/
- Verification: SHA256 OK
- Purpose: test artifact only

## Target boot machine after USB creation

- Machine: Lenovo nonaym5
- Login user: nonaym5
- LAN IP: 192.168.1.217
- Architecture: x86_64
- Current storage: nvme0n1
- Storage model: SAMSUNG MZVLB256HAHQ-000L7
- Boot mode observed: Legacy BIOS or unknown

## Protected target

The following remains no-write production:

- Protectli 2420 / ns2 quantaa / 10.1.1.109

No action against this machine is allowed.

## USB media-write test requirements

Before any future USB write, the operator must provide or confirm:

- USB drive is physically inserted into omnieon
- USB drive can be erased
- USB drive is not an internal disk
- USB drive is not omnieon system/root disk
- USB drive is not any protected disk
- USB drive is large enough for the ISO
- USB drive identity is clear from read-only inspection

## Required read-only USB inspection fields

A future phase must collect:

- lsblk full output
- candidate device path
- candidate size
- candidate model
- candidate transport
- candidate removable flag
- candidate mountpoints
- current root filesystem source
- parent disk of current root filesystem
- whether candidate equals system/root disk
- whether candidate has mounted partitions
- whether candidate appears removable
- whether candidate is ambiguous

## Automatic block conditions

The future write process must stop if the candidate USB:

- equals the current root disk
- contains the current root filesystem
- appears to be internal system storage
- is too small
- is missing or unclear
- has ambiguous identity and no secondary confirmation
- matches any protected target/device rule

## Ambiguous-drive process

If removable detection is unclear:

1. Record drive list before USB insertion.
2. Ask operator to remove the USB.
3. Record drive list after removal.
4. Ask operator to insert the USB.
5. Record drive list after insertion.
6. Identify the newly appearing device.
7. Require secondary confirmation before write.

## Future write method candidate

A later reviewed phase may use a Linux-native media-write method such as:

- write ISO bytes to the selected USB block device
- sync/flush after write
- stop after write
- do not reboot

No runnable write command is included in Phase 10CR.

## Approval phrase candidate

A future USB write phase should require an exact approval phrase such as:

I APPROVE WRITING THE NONAYM DIY USB INSTALLER

This should be separate from any password prompt.

## Post-write plan

After USB creation:
- do not reboot omnieon automatically
- remove/eject USB safely
- move USB to Lenovo nonaym5
- boot Lenovo using boot menu, likely F12
- document whether Debian installer boots

## Still forbidden in Phase 10CR

- No USB/media write.
- No ISO/image write.
- No disk partitioning.
- No formatting.
- No package installs.
- No reboot.
- No action against nonaym5 beyond planning.
- No action against Protectli / ns2 quantaa.

## Future Phase 10CS candidate

Phase 10CS should perform read-only USB inventory after a USB drive is inserted into omnieon.

Phase 10CS should not write anything.

## Phase 10CR success criteria

Phase 10CR passes when:
- Controlled USB media-write test design is documented.
- USB inspection fields are documented.
- Automatic block conditions are documented.
- Ambiguous-drive handling is documented.
- Approval phrase candidate is documented.
- No USB/media write occurs.
- No machine is modified.
