# Nonaym DIY Phase 10AU — Official Raspberry Pi OS Candidate Image Identification

Status: Planning only / no download / no write

Purpose:
Identify the official Raspberry Pi OS image family to consider for the first Raspberry Pi / UnifiPi Nonaym DIY base-image test.

This phase does not download an image.
This phase does not build an image.
This phase does not select a final image.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Candidate source

Source family:
- Official Raspberry Pi OS downloads
- Candidate family: Raspberry Pi OS Lite 64-bit
- Release date observed: 21 Apr 2026
- Debian version observed: 13 / trixie
- Kernel version observed: 6.12
- Download size observed: 551 MB
- Storage required observed: 3,080 MB
- SHA256 observed: 4cd31df026fd82243805a326dc0cafd7383f7e3d30c9413e7044d507aae281e2

## Why this candidate family

Official Raspberry Pi OS Lite 64-bit is the preferred first image family because:

- It is the official Raspberry Pi-supported OS.
- It supports Raspberry Pi / ARM hardware directly.
- It has no desktop environment, matching appliance-style testing.
- It gives the lowest-risk first boot validation path.
- It separates base OS validation from Nonaym service setup.
- It provides a clearer recovery/reflash path than a custom image.
- It reduces early supply-chain and hardware-compatibility risk.

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

## Still forbidden in Phase 10AU

- No image download.
- No image build.
- No image selection as final.
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

## Future artifact details still required

A later phase must identify and document:

- Exact image filename.
- Exact source/download location.
- Exact release date.
- Exact Debian version.
- Exact kernel version.
- Exact architecture.
- Exact Raspberry Pi model compatibility.
- Exact SHA256 hash.
- Checksum verification command.
- Checksum verification result.
- Expected boot behavior.
- Expected first-login/setup behavior.
- Expected network behavior.
- Recovery/reflash method.

## Phase 10AU success criteria

Phase 10AU passes when:

- Official Raspberry Pi OS Lite 64-bit candidate family is documented.
- Reason for using the official Lite base image is documented.
- Required future artifact fields are documented.
- No image is downloaded.
- No image is written.
- No machine is modified.
