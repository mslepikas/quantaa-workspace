# Nonaym DIY Phase 10V — Q/Danno Review of Hardware Requirements

Status: Review gate

Purpose:
Review the Phase 10U minimum hardware requirements update before treating the requirements as a stronger internal baseline or testing additional machines.

This phase does not install Nonaym DIY.
This phase does not create an installer.
This phase does not write an image.
This phase does not modify DNS, network settings, disks, packages, or services.

## Review target

Primary file:
- nonaym-dns/phases/phase10u/README.md

Supporting result files:
- nonaym-dns/phases/phase10r/PHASE10R-NONAYM4-RESULT.md
- nonaym-dns/phases/phase10t/PHASE10T-NONAYM1-RESULT.md

## Q review focus

Q should review:

- Whether the draft requirements are technically defensible from two machines.
- Whether x86_64-first remains the right first-release direction.
- Whether 4GB minimum / 8GB recommended RAM is reasonable.
- Whether 64GB minimum / 128GB+ recommended SSD is reasonable.
- Whether wired Ethernet should remain strongly recommended.
- Whether Legacy BIOS support should remain tentative.
- Whether nonaym5, Protectli 2420, or Raspberry Pi should be the next comparison target.
- Whether any technical claims are unsupported.

Q must not recommend install behavior yet.

## Danno review focus

Danno should review:

- Whether Phase 10U remains documentation-only.
- Whether customer-facing claims are premature.
- Whether privacy/redaction guidance is sufficient.
- Whether GB10/omnieon exclusion remains intact.
- Whether the requirements could cause a user to risk wiping a daily-use or customer machine.
- Whether the next phase should require another Q/Danno gate before any install-capable behavior.

Danno must return one verdict:
- APPROVE
- CAUTION
- STOP

## Phase 10V success criteria

Phase 10V passes when:

- Q review is completed.
- Danno review is completed.
- Danno returns APPROVE or a manageable CAUTION.
- Human operator approves the next phase.
