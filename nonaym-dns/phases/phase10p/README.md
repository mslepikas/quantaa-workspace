# Nonaym DIY Phase 10P — Clean Restart Dry-Run Skeleton

Status: Planned / dry-run only

Purpose:
Create the first safe installer skeleton for Nonaym DIY without any install-capable behavior.

Hard guardrails:
- Do not use GB10/omnieon as a Nonaym DIY test target.
- Do not partition disks.
- Do not write images.
- Do not install packages.
- Do not modify DNS.
- Do not start, stop, enable, disable, or restart services.
- Do not alter network settings.
- Do not collect customer/private data.
- Do not perform hardware tests on GB10/omnieon.

Allowed behavior in Phase 10P:
- Print the intended future workflow.
- Print safety warnings.
- Confirm the script is dry-run only.
- Exit cleanly.
- Create no system changes.

Future phases may add:
- Device inventory read-only checks.
- Hardware compatibility report.
- USB/image validation.
- Test-machine-only boot validation.

Phase 10P is intentionally non-functional as an installer.
