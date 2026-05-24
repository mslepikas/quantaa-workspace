# Nonaym DIY Phase 10CH — x86_64 Image/Artifact Selection for Lenovo nonaym5

Status: Planning only / no download / no write

Purpose:
Select the correct image/artifact direction for the Lenovo nonaym5 x86_64 test target.

This phase does not download an image.
This phase does not build an image.
This phase does not write an image.
This phase does not flash USB or NVMe.
This phase does not partition disks.
This phase does not format disks.
This phase does not install packages.
This phase does not modify DNS, network settings, packages, disks, or services.
This phase does not reboot any machine.

## Prior pivot

Phase 10CG pivoted the next first-boot Nonaym DIY target from Raspberry Pi / UnifiPi NVMe to Lenovo nonaym5.

Reason:
- Raspberry Pi NVMe boot path introduced boot complexity.
- nonaym5 is a simpler PC-style x86_64 target.
- nonaym5 better represents a repurposed customer PC/laptop style DIY target.

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

## Important image rule

Do not reuse the Raspberry Pi OS Lite ARM/aarch64 image.

The Raspberry Pi image is for ARM/aarch64 and is not appropriate for Lenovo nonaym5 x86_64.

## Candidate image direction

Preferred first x86_64 test artifact:

- Debian amd64 minimal/server-style installer or image
- Architecture: amd64 / x86_64
- Goal: simple, reproducible PC boot path
- Target: local Nonaym DIY base image path for repurposed PC hardware

## Candidate options

### Option A — Debian amd64 netinst ISO

Pros:
- Official Debian source.
- Small download.
- Good for manual install validation.
- Good for learning boot behavior on Lenovo.
- Standard PC/BIOS/UEFI workflow.

Cons:
- Not a direct disk-image write like the Raspberry Pi test.
- Requires installer interaction unless preseed/autoinstall is added later.

### Option B — Debian amd64 cloud/raw image

Pros:
- More like direct disk image workflow.
- Better match to future image-writing path.

Cons:
- May require cloud-init or image customization for login/network access.
- More risk of first-boot login/network confusion.

### Option C — Build custom Nonaym x86_64 raw image later

Pros:
- Best future customer DIY artifact.
- Can include known login/network defaults and Nonaym setup.

Cons:
- Requires build pipeline.
- Should come after simple x86_64 boot validation.

## Phase 10CH recommendation

Use Option A first for nonaym5:

- Debian amd64 netinst ISO
- Purpose: validate PC boot/install path on Lenovo
- No automated disk write yet
- No final customer artifact yet

Then later phases can decide whether to:
- install manually as baseline,
- build a raw image,
- or prepare an automated installer.

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

## Still forbidden in Phase 10CH

- No image download.
- No image writing.
- No disk partitioning.
- No formatting.
- No package installs.
- No reboot.
- No action against nonaym5 beyond planning.
- No action against Protectli / ns2 quantaa.

## Future Phase 10CI candidate

Phase 10CI should prepare Q/Danno review of the x86_64 image/artifact direction.

If approved, a later phase may download and checksum-verify a Debian amd64 artifact.

## Phase 10CH success criteria

Phase 10CH passes when:
- x86_64 image direction is documented.
- Raspberry Pi ARM image is explicitly excluded.
- Debian amd64 direction is selected for review.
- No image is downloaded.
- No machine is modified.
