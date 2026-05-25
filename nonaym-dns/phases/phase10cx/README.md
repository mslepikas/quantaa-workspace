# Nonaym DIY Phase 10CX — USB Remove/Reinsert Identity Confirmation

Status: Read-only identity confirmation / no media write

Purpose:
Strengthen USB identity verification before creating a final executable USB write script.

This phase confirms the USB candidate by scanning storage with the USB inserted, removed, and reinserted.

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

## Prior approved candidate

From Phase 10CT / 10CU:

- Candidate USB: /dev/sda
- Candidate partition: /dev/sda1
- Size: 7.5G
- Model: UDisk
- Serial: General_UDisk-0:0
- Transport: usb
- Removable flag: 1
- Mountpoint: /media/mslepikas/DEBIAN 13_4

Blocked system disk:

- /dev/nvme0n1
- Model: EG6 KIOXIA 2048GB
- Root: /dev/nvme0n1p3
- EFI: /dev/nvme0n1p1

## Method

1. Scan storage while USB is inserted.
2. Operator removes USB.
3. Scan storage with USB removed.
4. Operator reinserts USB.
5. Scan storage after USB is reinserted.
6. Confirm same USB identity returns.
7. Confirm /dev/nvme0n1 remains blocked.
8. Do not write anything.

## Success criteria

Phase 10CX passes when:
- inserted scan is captured
- removed scan is captured
- reinserted scan is captured
- USB disappears when removed
- USB reappears when inserted
- USB identity matches prior candidate
- no write occurs
