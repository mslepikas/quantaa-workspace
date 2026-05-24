# Nonaym DIY Phase 10BA — Download-Only and Checksum-Only Execution Planning

Status: Execution planning only / no download / no write

Purpose:
Prepare the exact future download-only and checksum-only command plan for the official Raspberry Pi OS Lite 64-bit candidate image.

This phase does not download an image.
This phase does not build an image.
This phase does not select a final image for writing.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Candidate image

- Candidate: Raspberry Pi OS Lite 64-bit
- Source: official Raspberry Pi OS downloads
- Required domain: raspberrypi.com
- Required transport: HTTPS
- Release date observed: 21 Apr 2026
- Debian version observed: 13 / trixie
- Kernel version observed: 6.12
- SHA256 observed: 4cd31df026fd82243805a326dc0cafd7383f7e3d30c9413e7044d507aae281e2

The SHA256 is observed only.
It must be verified during the future download/checksum phase.

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

## Still forbidden in Phase 10BA

- No image download.
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

## Future artifact folder

Planned folder:

- nonaym-dns/artifacts/raspios-lite-64bit-20260421/

This folder may be created in a future approved download-only phase.

## Future artifact names

Planned local names:

- nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256
- nonaym-diy-rpi-base-raspios-lite-64bit-20260421.PROVENANCE.md

## Future download-only command plan

A later approved phase may prepare commands that:

1. Create the artifact folder.
2. Fetch only from HTTPS official Raspberry Pi source.
3. Save the image to the artifact folder.
4. Save the checksum beside the image.
5. Verify SHA256 locally.
6. Write provenance documentation.
7. Stop.

The future command plan must not include:

- dd
- bmaptool
- Raspberry Pi Imager write action
- mount
- partitioning
- formatting
- service changes
- reboot

## Future checksum verification plan

A later approved phase must verify:

- Official SHA256 source
- Local downloaded file SHA256
- Exact match between official and local hash
- Checksum command used
- Verification date/time
- Operator
- Statement that no write occurred

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

## Future Phase 10BB candidate

Phase 10BB should prepare Q/Danno review of this download-only/checksum-only execution plan.

If approved, a later phase may perform the actual download-only and checksum-only work.

No image should be written until:
- image is downloaded
- checksum is locally verified
- live target identity is reconfirmed
- live target storage is reconfirmed
- Q approves write packet
- Danno approves write packet
- human enters exact approval phrase

## Phase 10BA success criteria

Phase 10BA passes when:

- Future download-only command plan is documented.
- Future checksum-only command plan is documented.
- Future artifact folder and naming plan are documented.
- Future provenance document requirements are documented.
- Forbidden commands/actions are documented.
- No image is downloaded.
- No image is written.
- No machine is modified.
