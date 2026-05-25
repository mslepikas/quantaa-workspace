# Nonaym DIY Phase 10DC — Final USB Write Execution Checkpoint

Status: Final execution checkpoint / no execution yet

Purpose:
Create the final checkpoint before running the approved Phase 10CY hardened USB write script.

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

## Prior approval

Phase 10DB reviewed the hardened USB write script.

Review result:
- Q: PASS
- Danno: APPROVE

## Final script

Reviewed script:

- nonaym-dns/phases/phase10cy/PHASE10CY-FINAL-USB-WRITE-SCRIPT.sh

The script must remain non-executable until the execution phase.

## Intended USB target

- Device: /dev/sda
- Partition: /dev/sda1
- Model: UDisk
- By-id: usb-General_UDisk-0:0
- Size: 7.5G
- Transport: usb
- Removable flag: 1
- Mountpoint before write may be: /media/mslepikas/DEBIAN 13_4

## Blocked system disk

The following omnieon system/root disk must never be written:

- /dev/nvme0n1
- Root: /dev/nvme0n1p3
- EFI: /dev/nvme0n1p1
- Model: EG6 KIOXIA 2048GB
- Size: 1.9T

## ISO artifact

- ISO: nonaym-dns/artifacts/debian-amd64-netinst-trixie/debian-13.5.0-amd64-netinst.iso
- SHA256: nonaym-dns/artifacts/debian-amd64-netinst-trixie/debian-13.5.0-amd64-netinst.iso.sha256

## Required human approval phrase inside script

The script will require this exact phrase before writing:

I APPROVE WRITING THE NONAYM DIY USB INSTALLER TO /DEV/SDA

## Final readiness confirmations

Before execution:
- USB is physically inserted.
- USB can be erased.
- /dev/sda is still the USB device.
- /dev/nvme0n1 is still the omnieon system disk and blocked.
- Debian ISO checksum still passes.
- Script remains reviewed and unchanged.
- Human operator is ready for the USB to be erased.

## Still forbidden in Phase 10DC

- No chmod +x.
- No script execution.
- No USB/media write.
- No disk writing.
- No partitioning.
- No formatting.
- No install.
- No reboot.
- No action against nonaym5.
- No action against Protectli / ns2 quantaa.

## Next phase

Phase 10DD should be the actual USB write execution phase if the human operator chooses to proceed.
