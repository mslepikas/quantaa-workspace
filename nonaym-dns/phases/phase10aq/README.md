# Nonaym DIY Phase 10AQ — Candidate Image Artifact Definition

Status: Planning only / no image build / no write

Purpose:
Define what the first candidate Raspberry Pi / UnifiPi Nonaym DIY image artifact should be before any image is built, selected, checksummed, or written.

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
- Storage model: SANZANG
- Storage size: 238.5G
- Role: future Raspberry Pi overwrite/install test target after final approval

Protected production target:

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- Status: production
- Rule: no write, no script copy, no reboot, no DNS/network/service changes, no install testing

## Prior approval chain

- Phase 10AO: image-artifact requirements documented.
- Phase 10AP: Q/Danno approved image-artifact requirements.
- Phase 10AM: command-preview packet created with image artifact TBD.
- Phase 10AN: Q/Danno approved command-preview packet.

## Still forbidden in Phase 10AQ

- No image writing.
- No image flashing.
- No disk partitioning.
- No formatting.
- No package installation on target machines.
- No DNS changes.
- No service changes.
- No network reconfiguration.
- No reboot.
- No actual write action against Raspberry Pi / UnifiPi.
- No write action against Protectli / ns2 quantaa.

## Candidate image definition

The first candidate image should be:

- Platform: Raspberry Pi / ARM
- Architecture: aarch64
- Purpose: Nonaym DIY test image
- Intended test target: UnifiPi only
- Intended storage target: nvme0n1 only after live re-verification
- Customer-facing status: not customer-ready
- Production status: not production-ready
- Build status: not built in this phase

## Candidate image contents

The candidate image should include only the minimum needed to validate the Nonaym DIY appliance path.

Expected future contents:

- Debian/Raspberry Pi OS compatible base
- Docker or container runtime if required by the Nonaym DNS design
- Technitium DNS container or installation plan, only after later review
- Minimal local health/status check
- Clear version/build marker
- No customer data
- No production secrets
- No personal session data
- No API keys
- No Cloudflare tokens
- No GitHub tokens
- No SSH private keys
- No hardcoded dependency on Protectli / ns2 quantaa
- No production DNS role

## Candidate image naming draft

Suggested future naming pattern:

- nonaym-diy-rpi-aarch64-v0.1.0-test.img
- nonaym-diy-rpi-aarch64-v0.1.0-test.img.sha256

This is a naming draft only.
No image artifact exists yet.

## Candidate image metadata requirements

A future candidate image must document:

- Image filename
- Image version/build
- Build date
- Target architecture
- Target hardware class
- Base OS/version
- Included services
- Default network behavior
- Default login/setup behavior
- Expected first boot behavior
- Recovery/reflash instructions
- SHA256 checksum
- Source provenance
- Build notes
- Known limitations

## Checksum standard

Future checksum format:

- SHA256 required
- Checksum file must be stored next to image artifact
- Checksum verification command must be documented
- Verification result must be captured before any future write-command review

## Raspberry Pi compatibility requirements

Future candidate image must state:

- Raspberry Pi model or model family compatibility
- aarch64 compatibility
- NVMe boot/storage expectations
- Ethernet expectation
- Wi-Fi status: disabled, optional, or unsupported
- Minimum RAM expectation
- Minimum storage expectation

## First boot expectations

Future candidate image must document expected first boot behavior:

- Whether first boot is interactive or unattended
- Expected hostname behavior
- Expected network behavior
- Expected local service startup behavior
- Expected DNS service behavior
- Expected dashboard/status behavior, if any
- Expected failure symptoms
- Expected recovery steps

## Recovery / reflash requirements

Before any candidate image can be used:

- Known-good Raspberry Pi recovery media must be available.
- Reflash method must be documented.
- Physical access must be confirmed.
- Network recovery method must be documented.
- Operator must accept that UnifiPi may become temporarily unbootable.

## Future Phase 10AR candidate

Phase 10AR should create a Q/Danno review packet for this candidate image artifact definition.

If approved, a later phase may plan how to build or obtain the candidate image.

No image should be written until:
- image artifact exists
- checksum is verified
- live target identity is reconfirmed
- live target storage is reconfirmed
- Q approves
- Danno approves
- human enters exact approval phrase

## Phase 10AQ success criteria

Phase 10AQ passes when:

- Candidate image purpose is defined.
- Candidate image expected contents are defined.
- Forbidden contents are repeated.
- Naming and metadata requirements are drafted.
- Checksum standard is defined.
- Raspberry Pi compatibility requirements are drafted.
- First boot and recovery expectations are drafted.
- No image is built.
- No image is selected.
- No image writing occurs.
- No machine is modified.
