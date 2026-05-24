# Nonaym DIY Phase 10AW — Exact Raspberry Pi OS Lite Provenance Verification Plan

Status: Planning only / no download / no write

Purpose:
Define the exact provenance and verification plan for the Raspberry Pi OS Lite 64-bit image candidate before any download, checksum verification, or write-command phase.

This phase does not download an image.
This phase does not build an image.
This phase does not select a final image for writing.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Official source candidate

Source:
- Raspberry Pi official operating systems download page
- Canonical domain: raspberrypi.com
- Required transport: HTTPS

Candidate:
- Raspberry Pi OS Lite
- System: 64-bit
- Debian version: 13 / trixie
- Kernel version: 6.12
- Release date: 21 Apr 2026
- Download size: 551 MB
- Storage required: 3,080 MB
- SHA256 observed: 4cd31df026fd82243805a326dc0cafd7383f7e3d30c9413e7044d507aae281e2
- Desktop environment: none

## Why this candidate

Raspberry Pi OS Lite 64-bit remains the preferred first base image because:

- It is official Raspberry Pi OS.
- It is 64-bit / aarch64 compatible.
- It has no desktop environment.
- It is better aligned with appliance-style testing.
- It separates base OS boot validation from Nonaym service setup.
- It provides a lower-risk recovery/reflash path than a custom image.

## Target context

Future test target:

- Hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Hardware class: Raspberry Pi / ARM
- Storage candidate: nvme0n1
- Role: future Raspberry Pi overwrite/install test target after final approval

Protected production target:

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- Status: production
- Rule: no write, no script copy, no reboot, no DNS/network/service changes, no install testing

## Still forbidden in Phase 10AW

- No image download.
- No image build.
- No image writing.
- No disk partitioning.
- No formatting.
- No package installation on target machines.
- No DNS changes.
- No service changes.
- No network reconfiguration.
- No reboot.
- No actual write action against Raspberry Pi / UnifiPi.
- No write action against Protectli / ns2 quantaa.

## Required checks before any future download

Before a future phase may download the image:

1. Confirm source is the official Raspberry Pi OS download page.
2. Confirm URL uses HTTPS.
3. Confirm domain is canonical Raspberry Pi domain.
4. Confirm candidate is Raspberry Pi OS Lite 64-bit.
5. Confirm release date.
6. Confirm Debian version.
7. Confirm kernel version.
8. Confirm observed SHA256.
9. Confirm download size and storage requirement.
10. Confirm no image is written in the download phase.
11. Confirm Q review.
12. Confirm Danno review.
13. Confirm human approval to proceed to download-only phase.

## Required checks after any future download

After a future approved download-only phase:

1. Save image artifact in a controlled local artifacts folder.
2. Save checksum file beside the image artifact.
3. Verify SHA256 using local checksum command.
4. Compare local checksum result to official published SHA256.
5. Document checksum result.
6. Do not write image after download.
7. Stop for Q/Danno review before any write-command phase.

## Future artifact naming

Suggested future local artifact naming:

- nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256
- nonaym-diy-rpi-base-raspios-lite-64bit-20260421.PROVENANCE.md

This is a naming plan only.
No artifact exists yet.

## Future Phase 10AX candidate

Phase 10AX should prepare Q/Danno review of this exact provenance/download plan.

If approved, a later phase may perform download-only and checksum-only work.

No image should be written until:
- image is downloaded
- checksum is locally verified
- live target identity is reconfirmed
- live target storage is reconfirmed
- Q approves write packet
- Danno approves write packet
- human enters exact approval phrase

## Phase 10AW success criteria

Phase 10AW passes when:

- Exact official candidate details are documented.
- HTTPS/canonical-domain requirement is documented.
- Future download-only checks are documented.
- Future checksum checks are documented.
- No image is downloaded.
- No image is written.
- No machine is modified.
