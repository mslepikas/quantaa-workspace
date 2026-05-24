# Nonaym DIY Phase 10CL — Debian amd64 Netinst ISO Download/Checksum Result

Status: Download/checksum only

Purpose:
Download the official Debian amd64 netinst ISO and verify it locally using the official SHA256SUMS file.

This phase does not write an image.
This phase does not flash USB or NVMe.
This phase does not partition disks.
This phase does not format disks.
This phase does not install packages.
This phase does not modify DNS, network settings, packages, disks, or services.
This phase does not reboot any machine.
This phase does not touch nonaym5.
This phase does not touch Protectli / ns2 quantaa.

## Artifact target

- Debian version: 13.5 / trixie
- Architecture: amd64 / x86_64
- Artifact: debian-13.5.0-amd64-netinst.iso
- Source: official Debian cdimage HTTPS source
- Verification: official SHA256SUMS local check

## Stop point

This phase stops after download, checksum verification, and provenance documentation.
