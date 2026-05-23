# Nonaym DIY Phase 10Q — Read-Only Hardware Inventory Plan

Status: Planning only

Purpose:
Define the next safe step after Phase 10P. Phase 10Q will prepare for a future read-only hardware inventory report for dedicated Nonaym DIY test machines.

Hard guardrails:
- Do not use GB10/omnieon as a Nonaym DIY test target.
- Do not install packages.
- Do not partition disks.
- Do not write images.
- Do not modify DNS.
- Do not change network settings.
- Do not start, stop, enable, disable, or restart services.
- Do not collect customer/private data.
- Do not perform destructive checks.

Allowed future Phase 10Q behavior:
- Print machine identity.
- Detect CPU architecture.
- Detect RAM size.
- Detect boot mode if readable.
- List storage devices read-only.
- List network interfaces read-only.
- Generate a local compatibility report.
- Exit before any install-capable behavior.

Initial target machines for later manual testing:
- Raspberry Pi
- Protectli 2420
- Generic Intel machine
- Lenovo test machine 1
- Lenovo test machine 2

GB10/omnieon role:
- Allowed for editing and staging only.
- Not allowed as a Nonaym DIY install or hardware test target.
