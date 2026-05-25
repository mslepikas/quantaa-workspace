# Nonaym DIY Phase 10CV — USB Write-Command Preparation

Status: Command preparation only / no media write

Purpose:
Prepare the future USB media-write command structure for writing the verified Debian amd64 netinst ISO to the selected USB drive.

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

Phase 10CU reviewed and approved the USB candidate safety result.

Candidate USB:
- Device: /dev/sda
- Partition: /dev/sda1
- Size: 7.5G
- Model: UDisk
- Serial: General_UDisk-0:0
- Transport: usb
- Removable flag: 1
- Mounted at: /media/mslepikas/DEBIAN 13_4

Blocked omnieon system disk:
- Device: /dev/nvme0n1
- Model: EG6 KIOXIA 2048GB
- Size: 1.9T
- Root: /dev/nvme0n1p3
- EFI: /dev/nvme0n1p1

## ISO artifact

Verified in Phase 10CL:

- ISO: nonaym-dns/artifacts/debian-amd64-netinst-trixie/debian-13.5.0-amd64-netinst.iso
- SHA256 file: nonaym-dns/artifacts/debian-amd64-netinst-trixie/debian-13.5.0-amd64-netinst.iso.sha256
- Provenance: nonaym-dns/artifacts/debian-amd64-netinst-trixie/debian-trixie-amd64-netinst.PROVENANCE.md

## Required future pre-write checks

Before any future USB write phase:

1. Reconfirm ISO checksum.
2. Reconfirm USB device still exists as /dev/sda.
3. Reconfirm /dev/sda is USB transport.
4. Reconfirm /dev/sda is removable.
5. Reconfirm /dev/sda model is UDisk.
6. Reconfirm /dev/sda serial is General_UDisk-0:0 if available.
7. Reconfirm /dev/sda size is approximately 7.5G.
8. Reconfirm /dev/sda is not /dev/nvme0n1.
9. Reconfirm /dev/sda does not contain root filesystem.
10. Reconfirm /dev/nvme0n1 is blocked as omnieon system disk.
11. Reconfirm /dev/sda1 mountpoint.
12. Safely unmount /dev/sda1 before write.
13. Require exact human approval phrase before write.

## Future approval phrase candidate

A future USB write phase should require the exact phrase:

I APPROVE WRITING THE NONAYM DIY USB INSTALLER TO /DEV/SDA

The phrase should be entered immediately before the write.

## Future write-command structure

A future reviewed phase may use this structure:

1. Set ISO path.
2. Set checksum path.
3. Set USB target device path.
4. Verify ISO checksum.
5. Verify USB identity.
6. Block /dev/nvme0n1 and any root/system disk.
7. Unmount /dev/sda1.
8. Ask for exact approval phrase.
9. Write ISO to /dev/sda.
10. Sync.
11. Stop.
12. Do not reboot.

## Non-runnable method preview

The future write method may use a Linux-native raw ISO-to-USB write pattern.

This phase intentionally does not include a runnable command.

## Still forbidden in Phase 10CV

- No USB/media write.
- No ISO/image write.
- No disk partitioning.
- No formatting.
- No package installs.
- No reboot.
- No action against nonaym5.
- No action against Protectli / ns2 quantaa.

## Future Phase 10CW candidate

Phase 10CW should prepare Q/Danno review of this USB write-command preparation.

After approval, a later phase may create a final executable USB write script, still gated by Q/Danno and human approval.

## Phase 10CV success criteria

Phase 10CV passes when:
- USB write-command structure is documented.
- Required pre-write checks are documented.
- System disk block is documented.
- Safe unmount requirement is documented.
- Exact approval phrase is documented.
- No USB/media write occurs.
- No machine is modified.
