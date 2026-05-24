# Nonaym DIY Phase 10AS — Candidate Image Build/Obtain Approach

Status: Planning only / no image build / no write

Purpose:
Define the approach for obtaining or building the first candidate Raspberry Pi / UnifiPi Nonaym DIY image artifact.

This phase does not install Nonaym DIY.
This phase does not build a final image.
This phase does not select a final image.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

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

## Prior approval chain

- Phase 10AO: image-artifact requirements documented.
- Phase 10AP: Q/Danno approved image-artifact requirements.
- Phase 10AQ: candidate image definition created.
- Phase 10AR: Q/Danno approved candidate image definition.

## Still forbidden in Phase 10AS

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

## Candidate image approach options

### Option A — Start from official Raspberry Pi OS image

Description:
Use an official Raspberry Pi OS 64-bit image as the base, then later add Nonaym DIY configuration through a controlled build process.

Advantages:
- Known Raspberry Pi compatibility.
- Easier recovery/reflash path.
- Strong upstream support.
- Best first ARM test base.

Concerns:
- Need to avoid embedding secrets.
- Need reproducible build notes.
- Need checksum/provenance verification.
- Need later review before customization.

### Option B — Build a custom image from scratch

Description:
Use a full image-build toolchain to create a custom Nonaym DIY Raspberry Pi image.

Advantages:
- More control.
- Cleaner appliance-style output.
- Better long-term reproducibility if done correctly.

Concerns:
- More complexity.
- More build-time risk.
- More chances to accidentally include host-specific files.
- Not recommended as the first image path.

### Option C — Use base OS plus post-install script

Description:
Install/flash a standard Raspberry Pi OS image first, then run a controlled Nonaym setup script later.

Advantages:
- Easier to understand and debug.
- Good for early testing.
- Separates OS boot validation from Nonaym service setup.

Concerns:
- Eventually requires install-capable scripts.
- Needs strong Q/Danno review before any setup script writes to the target.
- May not represent final customer DIY image experience.

## Recommended first approach

Recommended for first test path:

1. Use official Raspberry Pi OS 64-bit image as base.
2. Verify checksum and source provenance.
3. Boot/validate base image separately if approved in a later phase.
4. Add Nonaym DIY services only after separate reviewed setup/build phase.
5. Do not embed secrets, customer data, or production network assumptions.

Reason:
This gives the safest first ARM path and separates base hardware/boot validation from Nonaym service installation.

## Future image artifact requirements

A future candidate image or base image must document:

- Exact filename.
- Exact download/source URL or local artifact path.
- Source provenance.
- Build/download date.
- Version/build marker.
- Target architecture.
- Raspberry Pi model compatibility.
- SHA256 checksum.
- Checksum verification command.
- Expected boot behavior.
- Expected login/setup behavior.
- Expected network behavior.
- Recovery/reflash method.
- Known limitations.

## Forbidden image contents

The candidate image or any later customization must not include:

- Production secrets.
- API keys.
- Cloudflare tokens.
- GitHub tokens.
- SSH private keys.
- Customer data.
- Personal browser/session data.
- Hardcoded private network assumptions unless separately reviewed.
- Dependency on Protectli / ns2 quantaa.
- Production DNS role.

## Future Phase 10AT candidate

Phase 10AT should prepare a Q/Danno review packet for this build/obtain approach.

If approved, a later phase may identify a specific official Raspberry Pi OS 64-bit image candidate and verify checksum/provenance.

No image should be written until:
- Candidate image is identified.
- Checksum is verified.
- Live target identity is reconfirmed.
- Live target storage is reconfirmed.
- Q approves.
- Danno approves.
- Human enters exact approval phrase.

## Phase 10AS success criteria

Phase 10AS passes when:

- Candidate image approach options are documented.
- Recommended first approach is documented.
- Future artifact requirements are documented.
- Forbidden contents are repeated.
- No image is built.
- No image is selected as final.
- No image writing occurs.
- No machine is modified.
