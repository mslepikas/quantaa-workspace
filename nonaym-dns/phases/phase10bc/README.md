# Nonaym DIY Phase 10BC — Download-Only and Checksum-Only Execution

Status: Download/checksum execution only

Purpose:
Download the official Raspberry Pi OS Lite 64-bit candidate image to omnieon and verify SHA256 checksum.

This phase may download the image artifact to the local Nonaym artifacts folder.
This phase may verify checksum locally.
This phase may create provenance documentation.

This phase does not write an image to any device.
This phase does not partition disks.
This phase does not format disks.
This phase does not mount the image.
This phase does not install Nonaym DIY.
This phase does not modify DNS, network settings, packages, disks, or services.

## Candidate

- Candidate: Raspberry Pi OS Lite 64-bit
- Official source family: Raspberry Pi OS downloads
- Required domain: raspberrypi.com
- Required transport: HTTPS
- Release date: 21 Apr 2026
- Debian version: 13 / trixie
- Kernel version: 6.12
- Download size: 551 MB
- Storage required: 3,080 MB
- Expected SHA256: 4cd31df026fd82243805a326dc0cafd7383f7e3d30c9413e7044d507aae281e2

## Allowed in Phase 10BC

- Create local artifact folder on omnieon.
- Download image artifact to local artifact folder.
- Create local SHA256 file.
- Verify SHA256 locally.
- Create provenance document.
- Stop after checksum verification.

## Still forbidden in Phase 10BC

- No image writing.
- No flashing USB, SD, or NVMe.
- No disk partitioning.
- No formatting.
- No image mounting.
- No package installation on target machines.
- No DNS changes.
- No service changes.
- No network reconfiguration.
- No reboot.
- No SSH/action against Raspberry Pi / UnifiPi.
- No write action against Protectli / ns2 quantaa.
- No action against any production target.

## Protected production target

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- Status: production
- Rule: no write, no script copy, no reboot, no DNS/network/service changes, no install testing

## Completion rule

Stop after checksum verification and provenance documentation.
