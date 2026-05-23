# Nonaym DIY Phase 10R — First External Test-Machine Inventory Prep

Status: Planning only

Purpose:
Prepare the safe process for running the Phase 10Q read-only hardware inventory script on the first dedicated Nonaym DIY test machine.

This phase does not install Nonaym DIY.
This phase does not create an installer.
This phase does not write an image.
This phase does not modify DNS or network settings.

## Hard guardrails

- Do not use GB10/omnieon as a Nonaym DIY test target.
- Do not run install-capable behavior.
- Do not partition disks.
- Do not format disks.
- Do not write images.
- Do not install packages.
- Do not modify DNS.
- Do not alter network settings.
- Do not start, stop, enable, disable, or restart services.
- Do not collect customer/private data.
- Do not publish machine identifiers, serial numbers, MAC addresses, or private IPs without review.

## First test-machine candidates

Pick one machine only for the first run:

1. Lenovo test machine
2. Protectli 2420
3. Generic Intel machine
4. Raspberry Pi

Recommended first test:
Use a Lenovo or generic Intel machine before Raspberry Pi, because the first DIY baseline should confirm common x86_64 behavior.

## Phase 10R allowed actions

- Review the Phase 10Q inventory script.
- Prepare copy/run instructions for one external test machine.
- Define report filename and location.
- Define what output is safe to paste back for review.
- Keep GB10/omnieon as editing/staging machine only.

## Safe report handling

The inventory report may include:
- Hostname
- CPU model
- RAM amount
- Disk size/model
- Network interface names
- Boot mode

Before sharing publicly or using on a public website, review and redact:
- Serial numbers
- MAC addresses
- Private IP addresses
- Public IP addresses
- Usernames
- Wi-Fi SSIDs
- Any customer-specific identifiers

## Success criteria

Phase 10R is complete when:
- A safe one-machine test process exists.
- The operator chooses the first external test machine.
- No install behavior has been added.
- GB10/omnieon remains excluded as a test target.
