# Nonaym DIY Phase 10AP — Q/Danno Review of Image-Artifact Requirements

Status: Review gate

Purpose:
Review the Phase 10AO image-artifact selection requirements before any candidate Raspberry Pi / ARM image is selected or built.

This phase is review/documentation only.

This phase does not install Nonaym DIY.
This phase does not select a final image.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Review target

Primary file:
- nonaym-dns/phases/phase10ao/README.md

Supporting files:
- nonaym-dns/phases/phase10am/README.md
- nonaym-dns/phases/phase10an/PHASE10AN-Q-DANNO-REVIEW-RESULT.md
- nonaym-dns/phases/phase10ai/PHASE10AI-UNIFIPI-IDENTITY-RESULT.md

## Q review focus

Q should review:

- Whether image-artifact requirements are technically complete.
- Whether required image metadata is sufficient.
- Whether checksum requirements are sufficient.
- Whether Raspberry Pi / ARM compatibility requirements are clear.
- Whether expected boot, login, and network behavior should be required.
- Whether source provenance requirements are sufficient.
- Whether anything is missing before selecting or building a candidate image.

Q must not recommend image writing yet.

## Danno review focus

Danno should review:

- Whether forbidden image contents are complete.
- Whether production secrets, keys, tokens, and customer data are excluded.
- Whether Protectli / ns2 quantaa remains protected.
- Whether private network assumptions are controlled.
- Whether checksum/provenance requirements are adequate.
- Whether another Q/Danno gate is required before candidate image use.
- Whether no install-capable behavior is approved too early.

Danno must return one verdict:
- APPROVE
- CAUTION
- STOP

## Success criteria

Phase 10AP passes when:

- Q review is completed.
- Danno review is completed.
- Danno returns APPROVE or manageable CAUTION.
- Human operator approves the next phase.
