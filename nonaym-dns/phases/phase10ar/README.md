# Nonaym DIY Phase 10AR — Q/Danno Review of Candidate Image Definition

Status: Review gate

Purpose:
Review the Phase 10AQ candidate Raspberry Pi / UnifiPi image artifact definition before any image is built, selected, checksummed, or written.

This phase is review/documentation only.

This phase does not install Nonaym DIY.
This phase does not build a final image.
This phase does not select a final image.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Review target

Primary file:
- nonaym-dns/phases/phase10aq/README.md

Supporting files:
- nonaym-dns/phases/phase10ao/README.md
- nonaym-dns/phases/phase10ap/PHASE10AP-Q-DANNO-REVIEW-RESULT.md
- nonaym-dns/phases/phase10am/README.md
- nonaym-dns/phases/phase10an/PHASE10AN-Q-DANNO-REVIEW-RESULT.md
- nonaym-dns/phases/phase10ai/PHASE10AI-UNIFIPI-IDENTITY-RESULT.md

## Q review focus

Q should review:

- Whether the candidate image purpose is technically clear.
- Whether expected image contents are appropriate.
- Whether forbidden contents are complete.
- Whether naming and metadata requirements are adequate.
- Whether SHA256 checksum standard is sufficient.
- Whether Raspberry Pi compatibility requirements are specific enough.
- Whether first-boot expectations are specific enough.
- Whether recovery/reflash requirements are adequate.
- Whether anything is missing before a future image build/obtain planning phase.

Q must not recommend image writing yet.

## Danno review focus

Danno should review:

- Whether forbidden image contents are complete.
- Whether production secrets, API keys, tokens, SSH private keys, customer data, and personal session data are excluded.
- Whether Protectli / ns2 quantaa / 10.1.1.109 remains protected.
- Whether the candidate image definition avoids production DNS dependency.
- Whether checksum/provenance requirements are adequate.
- Whether customer-facing readiness is clearly denied.
- Whether another Q/Danno gate is required before image build, image selection, or image writing.
- Whether no install-capable behavior is approved too early.

Danno must return one verdict:
- APPROVE
- CAUTION
- STOP

## Success criteria

Phase 10AR passes when:

- Q review is completed.
- Danno review is completed.
- Danno returns APPROVE or manageable CAUTION.
- Human operator approves the next phase.
