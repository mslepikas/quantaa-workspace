# Nonaym DIY Phase 10AZ — Q/Danno Review of Download-Only and Checksum-Only Preparation

Status: Review gate

Purpose:
Review the Phase 10AY download-only and checksum-only preparation plan before any future image download or checksum verification phase.

This phase is review/documentation only.

This phase does not download an image.
This phase does not install Nonaym DIY.
This phase does not build an image.
This phase does not select a final image.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Review target

Primary file:
- nonaym-dns/phases/phase10ay/README.md

Supporting files:
- nonaym-dns/phases/phase10aw/README.md
- nonaym-dns/phases/phase10ax/PHASE10AX-Q-DANNO-REVIEW-RESULT.md
- nonaym-dns/phases/phase10av/PHASE10AV-Q-DANNO-REVIEW-RESULT.md
- nonaym-dns/phases/phase10ai/PHASE10AI-UNIFIPI-IDENTITY-RESULT.md

## Q review focus

Q should review:

- Whether the download-only and checksum-only preparation plan is technically complete.
- Whether official Raspberry Pi OS Lite 64-bit remains the correct candidate.
- Whether the future artifact folder and naming plan are reasonable.
- Whether the future provenance document requirements are complete.
- Whether future checksum verification steps are sufficient.
- Whether the plan correctly stops after checksum verification.
- Whether anything is missing before a future download-only/checksum-only phase.

Q must not recommend downloading or writing an image yet.

## Danno review focus

Danno should review:

- Whether this phase remains planning-only.
- Whether no image download/build/write is approved.
- Whether HTTPS/canonical-domain/source provenance checks remain required.
- Whether checksum verification is future required work, not already verified.
- Whether the proposed artifact folder is safe.
- Whether Protectli / ns2 quantaa / 10.1.1.109 remains protected.
- Whether no secrets, keys, tokens, or private assumptions are introduced.
- Whether another Q/Danno gate is required before actual download-only/checksum-only work.
- Whether no install-capable behavior is approved too early.

Danno must return one verdict:
- APPROVE
- CAUTION
- STOP

## Success criteria

Phase 10AZ passes when:

- Q review is completed.
- Danno review is completed.
- Danno returns APPROVE or manageable CAUTION.
- Human operator approves the next phase.
