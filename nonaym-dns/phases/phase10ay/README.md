# Nonaym DIY Phase 10AY — Download-Only and Checksum-Only Preparation

Status: Planning only / no download / no write

Purpose:
Prepare the future download-only and checksum-only phase for the official Raspberry Pi OS Lite 64-bit candidate image.

This phase does not download an image.
This phase does not build an image.
This phase does not select a final image for writing.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Candidate image family

- Candidate: Raspberry Pi OS Lite 64-bit
- Source: official Raspberry Pi OS downloads
- Required domain: raspberrypi.com
- Required transport: HTTPS
- Release date observed: 21 Apr 2026
- Debian version observed: 13 / trixie
- Kernel version observed: 6.12
- Download size observed: 551 MB
- Storage required observed: 3,080 MB
- SHA256 observed: 4cd31df026fd82243805a326dc0cafd7383f7e3d30c9413e7044d507aae281e2

The SHA256 is observed only.
It must be verified again against the official source during the future download/checksum phase.

## Target context

Future test target:

- Hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Storage candidate: nvme0n1
- Role: future Raspberry Pi overwrite/install test target after final approval

Protected production target:

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- Status: production
- Rule: no write, no script copy, no reboot, no DNS/network/service changes, no install testing

## Still forbidden in Phase 10AY

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

## Future download-only phase requirements

A later approved download-only phase must:

1. Confirm the official Raspberry Pi OS page is reachable.
2. Confirm URL uses HTTPS.
3. Confirm source domain is raspberrypi.com.
4. Confirm candidate is Raspberry Pi OS Lite 64-bit.
5. Confirm release date, Debian version, kernel version, and SHA256 from official source.
6. Create a controlled local artifact directory under the Nonaym scoped workspace or a documented artifacts path.
7. Download the image only to the controlled local artifact directory.
8. Save or create a checksum file beside the downloaded image.
9. Verify SHA256 locally.
10. Document the local checksum result.
11. Stop after checksum verification.
12. Do not write, flash, mount, expand, boot, or install the image.

## Proposed future artifact folder

Suggested future local folder:

- nonaym-dns/artifacts/raspios-lite-64bit-20260421/

This folder does not need to exist in Phase 10AY.

## Proposed future artifact names

Suggested future names:

- nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256
- nonaym-diy-rpi-base-raspios-lite-64bit-20260421.PROVENANCE.md

These are planning names only.
No artifact exists yet.

## Future provenance document requirements

A future provenance document must include:

- Official source page
- Exact download URL
- Canonical domain confirmation
- HTTPS confirmation
- Release date
- Debian version
- Kernel version
- Image filename
- Image size
- Storage required
- Official SHA256
- Local SHA256 result
- Verification command used
- Download date/time
- Operator
- Statement that no write occurred

## Future Phase 10AZ candidate

Phase 10AZ should prepare Q/Danno review of this download-only and checksum-only preparation plan.

If approved, a later phase may perform download-only and checksum-only work.

No image should be written until:
- image is downloaded
- checksum is locally verified
- live target identity is reconfirmed
- live target storage is reconfirmed
- Q approves write packet
- Danno approves write packet
- human enters exact approval phrase

## Phase 10AY success criteria

Phase 10AY passes when:

- Future download-only steps are documented.
- Future checksum-only steps are documented.
- Future artifact folder and naming plan are documented.
- Future provenance document requirements are documented.
- No image is downloaded.
- No image is written.
- No machine is modified.
