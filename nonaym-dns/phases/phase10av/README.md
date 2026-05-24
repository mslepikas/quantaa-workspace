# Nonaym DIY Phase 10AV — Q/Danno Review of Raspberry Pi OS Lite Candidate

Status: Review gate

Purpose:
Review the updated Phase 10AU official Raspberry Pi OS Lite 64-bit candidate image identification before any image is downloaded, selected as final, checksummed locally, or written.

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
- nonaym-dns/phases/phase10au/README.md

## Q review focus

Q should review:

- Whether Raspberry Pi OS Lite 64-bit is still the correct first candidate.
- Whether the observed release/date/Debian/kernel/checksum fields are sufficient for planning.
- Whether Lite remains preferred over Desktop for appliance testing.
- Whether exact image download/verification should wait until later.
- Whether any technical detail is missing before candidate image download planning.

Q must not recommend downloading or writing an image yet.

## Danno review focus

Danno should review:

- Whether this phase remains planning-only.
- Whether no download/build/write is approved.
- Whether checksum/provenance gates remain required.
- Whether Protectli / ns2 quantaa remains protected.
- Whether no production secrets or private assumptions are introduced.
- Whether another Q/Danno gate is required before download or write.

Danno must return one verdict:
- APPROVE
- CAUTION
- STOP

## Success criteria

Phase 10AV passes when:

- Q review is completed.
- Danno review is completed.
- Danno returns APPROVE or manageable CAUTION.
- Human operator approves the next phase.
