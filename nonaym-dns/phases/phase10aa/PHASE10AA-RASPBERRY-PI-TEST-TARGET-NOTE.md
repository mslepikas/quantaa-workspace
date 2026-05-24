# Phase 10AA Note — Raspberry Pi / UnifiPi Test Target Role

Status: Approved for future destructive testing, not yet active

Date: 2026-05-24

## Clarification

The Raspberry Pi / UnifiPi test machine is not production.

It may be used as a future Nonaym DIY test machine that can be overwritten during testing and installation phases.

## Target

- Machine name/hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Hardware class: Raspberry Pi / ARM
- Role: future overwrite/install-capable test target after separate approval

## Important distinction

This approval means the Raspberry Pi may be used for future destructive testing.

It does not mean install behavior is approved in the current phase.

Current status:
- Phase 10AA read-only inventory: allowed and completed
- Future image writing / overwrite testing: allowed only after a separate Q/Danno-reviewed install-capable phase
- Customer-facing ARM/Raspberry Pi support claims: not approved yet

## Guardrails

Before any overwrite, image-writing, or install testing:

- Create a dedicated install-capable phase plan.
- Confirm the Raspberry Pi is the intended target.
- Confirm no production data is needed from the device.
- Confirm the target storage can be overwritten.
- Confirm recovery/reflash path exists.
- Run Q technical review.
- Run Danno safety review.
- Require human approval before writing images or changing disks.

## Planning implication

Raspberry Pi / UnifiPi can now be considered the first approved destructive/install test device.

However:
- x86_64 remains the first Nonaym DIY customer baseline for now.
- Raspberry Pi remains an ARM path requiring separate validation.
- No installer/image-writing behavior should be added until the next reviewed phase.
