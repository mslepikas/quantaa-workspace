# Nonaym DIY Phase 10Y — Q/Danno Review of Three-Machine Requirements

Status: Review gate

Purpose:
Review the Phase 10X three-machine hardware requirements update before using it as the stronger internal Nonaym DIY hardware baseline.

This phase does not install Nonaym DIY.
This phase does not create an installer.
This phase does not write an image.
This phase does not modify DNS, network settings, disks, packages, or services.

## Review target

Primary file:
- nonaym-dns/phases/phase10x/README.md

Supporting result files:
- nonaym-dns/phases/phase10r/PHASE10R-NONAYM4-RESULT.md
- nonaym-dns/phases/phase10t/PHASE10T-NONAYM1-RESULT.md
- nonaym-dns/phases/phase10w/PHASE10W-NONAYM5-RESULT.md

## Q review focus

Q should review:

- Whether the three-machine requirements are technically defensible.
- Whether x86_64-first remains the correct first-release direction.
- Whether 4GB minimum / 8GB recommended RAM is still reasonable.
- Whether 64GB minimum / 128GB+ recommended SSD/NVMe is still reasonable.
- Whether wired Ethernet should remain strongly recommended.
- Whether Legacy BIOS should remain tentative but not excluded.
- Whether Protectli 2420 should be the next test target.
- Whether Raspberry Pi should remain a later ARM comparison.
- Whether any wording is too strong from only three test machines.

Q must not recommend install behavior yet.

## Danno review focus

Danno should review:

- Whether Phase 10X remains documentation-only.
- Whether customer-facing claims are still premature.
- Whether privacy/redaction guidance is sufficient.
- Whether GB10/omnieon exclusion remains intact.
- Whether daily-use/customer machines remain excluded without backup/recovery planning.
- Whether the next phase should remain read-only.
- Whether another Q/Danno gate is required before any install-capable behavior.

Danno must return one verdict:
- APPROVE
- CAUTION
- STOP

## Success criteria

Phase 10Y passes when:

- Q review is completed.
- Danno review is completed.
- Danno returns APPROVE or manageable CAUTION.
- Human operator approves the next phase.
