# Nonaym DIY Phase 10CJ — Debian amd64 Netinst ISO Download/Checksum Preparation

Status: Planning only / no download / no write

Purpose:
Prepare the future Debian amd64 netinst ISO download/checksum phase for Lenovo nonaym5.

This phase does not download an ISO.
This phase does not write an image.
This phase does not flash USB or NVMe.
This phase does not partition disks.
This phase does not format disks.
This phase does not install packages.
This phase does not modify DNS, network settings, packages, disks, or services.
This phase does not reboot any machine.

## Prior approval

Phase 10CI reviewed and approved the Phase 10CH x86_64 image/artifact direction.

Approved direction:
- Use Debian amd64 netinst ISO first.
- Defer Debian cloud/raw image.
- Defer custom Nonaym x86_64 raw image.
- Do not use Raspberry Pi OS ARM/aarch64 image for nonaym5.

## Target

- Machine: Lenovo nonaym5
- Hostname: nonaym5
- Login user: nonaym5
- LAN IP: 192.168.1.217
- Architecture: x86_64
- Storage: nvme0n1
- Storage size: 238.5G
- Storage model: SAMSUNG MZVLB256HAHQ-000L7
- Boot mode observed: Legacy BIOS or unknown

## Protected production target

The following remains no-write production:

- Protectli 2420 / ns2 quantaa / 10.1.1.109

Hard rules:
- no write
- no script copy
- no reboot
- no DNS/network/service changes
- no install testing
- no use as a target

## Candidate artifact

Candidate family:

- Debian stable amd64 netinst ISO
- Debian version: Debian 13 / trixie
- Architecture: amd64 / x86_64
- Artifact type: installer ISO
- Intended use: validate PC-style boot/install path on Lenovo nonaym5

## Required future source rules

A future download/checksum phase must:

- use HTTPS
- use official Debian domains only
- download the ISO
- download the official checksum file
- verify SHA256 locally
- document provenance
- stop after checksum verification

Approved official source family:

- debian.org
- cdimage.debian.org
- cdn-fastly.deb.debian.org or official Debian redirect/mirror only if documented

## Proposed local artifact folder

Future artifact folder:

- nonaym-dns/artifacts/debian-amd64-netinst-trixie/

Proposed future files:

- debian-trixie-amd64-netinst.iso
- debian-trixie-amd64-netinst.iso.sha256
- debian-trixie-amd64-netinst.PROVENANCE.md

## Still forbidden in Phase 10CJ

- No ISO download.
- No checksum download.
- No image writing.
- No disk partitioning.
- No formatting.
- No package installs.
- No USB flashing.
- No reboot.
- No action against nonaym5 beyond planning.
- No action against Protectli / ns2 quantaa.

## Future Phase 10CK candidate

Phase 10CK should create a Q/Danno review packet for this Debian amd64 netinst ISO download/checksum preparation.

If approved, a later phase may perform download-only and checksum-only execution.

## Phase 10CJ success criteria

Phase 10CJ passes when:
- Debian amd64 netinst ISO direction is documented.
- Official source requirements are documented.
- Local artifact folder/naming plan is documented.
- Future checksum/provenance requirements are documented.
- No ISO is downloaded.
- No machine is modified.
