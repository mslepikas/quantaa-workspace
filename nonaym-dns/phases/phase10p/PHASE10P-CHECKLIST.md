# Phase 10P Checklist

## Pre-checks

- [ ] GB10 post-reboot verification passed.
- [ ] OpenClaw active on 18789.
- [ ] mobile_dispatcher inactive and disabled.
- [ ] Hermes port 18889 unused.
- [ ] Ollama responding on 11434.
- [ ] Nonaym DNS scoped repo clean.
- [ ] Backup restart point verified.

## Dry-run skeleton requirements

- [ ] Script prints dry-run-only warning.
- [ ] Script has no install behavior.
- [ ] Script performs no disk writes.
- [ ] Script performs no package installation.
- [ ] Script performs no service changes.
- [ ] Script performs no DNS/network changes.
- [ ] Script exits cleanly.

## Explicitly forbidden in Phase 10P

- [ ] No disk partitioning.
- [ ] No image writing.
- [ ] No install target selection.
- [ ] No GB10/omnieon test-target use.
- [ ] No automatic service changes.
- [ ] No production download flow.
