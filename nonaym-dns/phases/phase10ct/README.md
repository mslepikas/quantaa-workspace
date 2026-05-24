# Nonaym DIY Phase 10CT — USB Insertion Delta Check

Status: Read-only USB insertion delta check / no media write

Purpose:
Identify the intended USB drive by comparing omnieon storage inventory before and after USB insertion.

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

## Prior result

Phase 10CS captured omnieon storage inventory and found no USB drive.

System/root disk identified:
- /dev/nvme0n1
- Model: EG6 KIOXIA 2048GB
- Root: /dev/nvme0n1p3
- EFI: /dev/nvme0n1p1

This internal disk must be blocked from any future write.

## Phase 10CT method

1. Capture baseline storage before USB insertion.
2. Operator inserts USB drive.
3. Capture storage after USB insertion.
4. Identify newly appeared device.
5. Confirm candidate is not /dev/nvme0n1.
6. Confirm candidate does not contain current root filesystem.
7. Still do not write anything.

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

Phase 10CT passes when:
- before-insertion inventory is captured
- after-insertion inventory is captured
- newly appeared USB candidate is identified, if present
- omnieon internal system disk is clearly excluded
- no write occurs
