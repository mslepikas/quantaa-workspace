# Nonaym DIY Phase 10Z — Protectli 2420 Production-Safe Inventory Plan

Status: Planning only

Purpose:
Plan how to evaluate the Protectli 2420 as an appliance-style Nonaym DIY comparison target without touching or writing to the production machine.

The Protectli 2420 is currently in production.

## Hard rule

Do not write to the Protectli 2420.

That means:

- Do not copy scripts to it.
- Do not write files to /tmp.
- Do not install packages.
- Do not change DNS.
- Do not change network settings.
- Do not restart services.
- Do not modify Docker.
- Do not modify firewall rules.
- Do not run install-capable behavior.
- Do not run inventory scripts unless separately approved.

## Allowed Phase 10Z behavior

Documentation-only planning is allowed.

Allowed sources may include:

- Existing known hardware notes
- Prior manual inventory already collected
- Manufacturer/spec-sheet information
- Read-only screenshots or pasted command output if already available
- Future planned maintenance-window checklist

## Production-safe approach

Because this machine is in production, Protectli testing should be split into two paths:

### Path A — No-touch documentation

Use existing known information only.

This path creates an internal planning comparison but does not log into or write to the machine.

### Path B — Future maintenance-window read-only check

Only after separate approval, during a safe maintenance window:

- Confirm production role.
- Confirm backups/recovery plan.
- Confirm services that must not be interrupted.
- Run only approved read-only commands.
- Do not copy scripts to the machine.
- Do not create report files on the machine.
- Capture output from the terminal session only if approved.
- Redact private network details before documentation.

## Comparison purpose

The Protectli 2420 should be used to compare appliance-style hardware against the three external test machines:

- nonaym4 Lenovo baseline
- nonaym1 generic Intel comparison
- nonaym5 Lenovo repeatability check

The comparison should focus on:

- CPU architecture
- RAM
- Storage type and size
- Number of Ethernet ports
- Boot mode if already known
- Production role and risk level
- Suitability as a future Nonaym Lite / appliance-style reference

## Not allowed in Phase 10Z

- No live testing on production Protectli.
- No script copy.
- No writing inventory reports to the machine.
- No package installation.
- No service inspection that could alter state.
- No Docker changes.
- No DNS changes.
- No network changes.
- No reboot.
- No install/image behavior.

## Phase 10Z success criteria

Phase 10Z passes when:

- Protectli is documented as production/no-write.
- A no-touch inventory planning path exists.
- A future maintenance-window path is documented but not executed.
- No production machine changes occur.
- No install behavior is added.
