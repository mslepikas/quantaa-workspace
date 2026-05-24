# Nonaym DIY Phase 10AO — Image-Artifact Selection Requirements

Status: Planning only

Purpose:
Define the requirements for selecting a future Raspberry Pi / UnifiPi Nonaym DIY image artifact before any write-command preview or execution phase.

This phase does not install Nonaym DIY.
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
- Storage candidate: nvme0n1
- Role: future Raspberry Pi / ARM overwrite test target after final approval

Protected production target:

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- Status: production
- Rule: no write, no script copy, no reboot, no DNS/network/service changes, no install testing

## Prior approval chain

- Phase 10AI: UnifiPi identity collected read-only.
- Phase 10AJ: Q/Danno approved UnifiPi identity binding.
- Phase 10AK: write-preview packet created.
- Phase 10AL: Q/Danno approved write-preview packet.
- Phase 10AM: filled-in command-preview packet created with image artifact still TBD.
- Phase 10AN: Q/Danno approved filled-in command-preview packet.

## Still forbidden in Phase 10AO

- No image writing.
- No disk partitioning.
- No formatting.
- No flashing USB, SD, or NVMe.
- No package installation.
- No DNS changes.
- No service changes.
- No network reconfiguration.
- No reboot.
- No actual write action against Raspberry Pi / UnifiPi.
- No write action against Protectli / ns2 quantaa.

## Image artifact requirements

Before any future image can be approved for write-command preview, it must have:

- Exact image filename.
- Exact image path or source location.
- Version/build marker.
- Target architecture clearly stated.
- Raspberry Pi / ARM compatibility clearly stated.
- Expected target storage type.
- Expected boot behavior.
- Expected first-boot network behavior.
- Expected default login or setup behavior.
- Checksum file.
- Checksum verification command.
- Checksum verification result.
- Source provenance: how the image was built or obtained.
- Recovery/reflash path if the image fails.

## Image artifact must not include

The image must not include:

- Production secrets.
- API keys.
- Cloudflare tokens.
- GitHub tokens.
- SSH private keys.
- Customer data.
- Personal browser/session data.
- Hardcoded private network assumptions unless explicitly reviewed.
- Any dependency on Protectli / ns2 quantaa.
- Any production DNS role.

## Required review before future image use

Before an image artifact can be used in any future write-command preview:

1. Image artifact must be identified.
2. Checksum must be verified.
3. Target architecture must match Raspberry Pi / ARM.
4. Image contents/purpose must be documented.
5. Recovery plan must be updated for that image.
6. Q must review technical suitability.
7. Danno must review safety/privacy risk.
8. Human operator must approve moving to the next phase.

## Future Phase 10AP candidate

Phase 10AP should create a Q/Danno review packet for these image-artifact selection requirements.

If Phase 10AP passes, a later phase may identify or build a candidate image artifact.

No write command should be prepared until an artifact exists, is checksummed, and passes Q/Danno review.

## Phase 10AO success criteria

Phase 10AO passes when:

- Image-artifact requirements are documented.
- Forbidden image contents are documented.
- Future review gates are documented.
- No image is selected.
- No image writing occurs.
- No machine is modified.
