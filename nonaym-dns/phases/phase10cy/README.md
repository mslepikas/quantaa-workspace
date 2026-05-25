# Nonaym DIY Phase 10CY — Final USB Write Script Creation

Status: Script creation only / no media write

Purpose:
Create the final controlled USB write script for writing the verified Debian amd64 netinst ISO to the approved USB candidate.

This phase creates a script file only.

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

## Prior approvals

Phase 10CW approved USB write-command preparation.

Phase 10CX confirmed USB identity using insert/remove/reinsert checks.

## Approved USB candidate

- Device: /dev/sda
- Partition: /dev/sda1
- Model: UDisk
- Serial/by-id: usb-General_UDisk-0:0
- Size: 7.5G
- Transport: usb
- Removable flag: 1
- Current mountpoint: /media/mslepikas/DEBIAN 13_4

## Blocked system disk

- Device: /dev/nvme0n1
- Model: EG6 KIOXIA 2048GB
- Size: 1.9T
- Root: /dev/nvme0n1p3
- EFI: /dev/nvme0n1p1

The script must refuse to write to /dev/nvme0n1.

## ISO artifact

- ISO: nonaym-dns/artifacts/debian-amd64-netinst-trixie/debian-13.5.0-amd64-netinst.iso
- SHA256 file: nonaym-dns/artifacts/debian-amd64-netinst-trixie/debian-13.5.0-amd64-netinst.iso.sha256

## Script file

- nonaym-dns/phases/phase10cy/PHASE10CY-FINAL-USB-WRITE-SCRIPT.sh

The script must remain non-executable in Phase 10CY.

## Required safety behavior in script

The script must:

1. Verify ISO checksum.
2. Confirm local host is omnieon.
3. Confirm target device is /dev/sda.
4. Reject /dev/nvme0n1.
5. Confirm /dev/sda exists.
6. Confirm /dev/sda transport is usb.
7. Confirm /dev/sda removable flag is 1.
8. Confirm /dev/sda model is UDisk.
9. Confirm /dev/sda by-id path exists.
10. Confirm /dev/sda is not the root filesystem parent.
11. Show current mountpoints.
12. Unmount /dev/sda1 safely before write.
13. Require exact human approval phrase.
14. Write ISO to /dev/sda.
15. Sync after write.
16. Stop.
17. Do not reboot.

## Required approval phrase

The script must require exactly:

I APPROVE WRITING THE NONAYM DIY USB INSTALLER TO /DEV/SDA

## Still forbidden in Phase 10CY

- No script execution.
- No chmod +x.
- No USB/media write.
- No ISO/image write.
- No partitioning.
- No formatting.
- No package installs.
- No reboot.
- No action against nonaym5.
- No action against Protectli / ns2 quantaa.

## Future Phase 10CZ candidate

Phase 10CZ should prepare Q/Danno review of this exact final USB write script.

Only after that review may a separate execution phase be considered.
