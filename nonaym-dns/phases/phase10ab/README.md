# Nonaym DIY Phase 10AB — Install-Test Safety Plan and Writable Target Policy

Status: Planning only

Purpose:
Define the safety policy for moving from read-only inventory work toward future install/image testing.

This phase does not install Nonaym DIY.
This phase does not write an image.
This phase does not partition disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Current machine policy

### No-write / production machine

The following machine must not be written to:

- Protectli 2420
- Host/role: ns2 quantaa
- LAN IP: 10.1.1.109
- Status: production
- Rule: no write, no script copy, no /tmp report, no service changes, no DNS/network changes, no reboot, no install testing

### Approved future test-machine pool

The following machines may be considered for future write/install testing after a separate Q/Danno-reviewed install-capable phase:

- Raspberry Pi / UnifiPi / 10.1.1.102
- nonaym4 / 192.168.1.212
- nonaym5 / 192.168.1.217
- nonaym1 / 192.168.1.211, only if explicitly approved before destructive testing

## Current preferred first install-test target

Preferred first destructive/install-capable test target:

- Raspberry Pi / UnifiPi
- LAN IP: 10.1.1.102
- Reason: user confirmed it is not production and can be overwritten for testing

## Still forbidden in Phase 10AB

- No install behavior.
- No image writing.
- No disk partitioning.
- No formatting.
- No package installation.
- No DNS changes.
- No service changes.
- No network reconfiguration.
- No reboot.
- No writes to Protectli / ns2 quantaa.

## Required gate before install-capable behavior

Before any future install/image-writing phase:

1. Create a dedicated install-capable phase plan.
2. Identify exactly one target machine.
3. Confirm the target is allowed to be overwritten.
4. Confirm the target is not production.
5. Confirm the target storage can be erased.
6. Confirm recovery/reflash path exists.
7. Confirm no customer/private data is needed.
8. Run Q technical review.
9. Run Danno safety review.
10. Require human approval before writing any image or changing any disk.

## Future install-test candidate sequence

Recommended sequence:

1. Raspberry Pi / UnifiPi — first overwrite-capable ARM image/install test
2. nonaym5 — Lenovo repeatability machine, if approved for overwrite
3. nonaym4 — Lenovo baseline machine, if approved for overwrite
4. nonaym1 — generic Intel machine, only after separate explicit approval
5. Protectli / ns2 quantaa — no-write production machine; planning only unless removed from production in a future approved maintenance plan

## Phase 10AB success criteria

Phase 10AB passes when:

- Protectli is clearly documented as the only no-write production machine.
- Raspberry Pi / UnifiPi is documented as approved for future overwrite/install testing.
- The future install-capable gate is documented.
- No install behavior is added.
- No machine is modified.
