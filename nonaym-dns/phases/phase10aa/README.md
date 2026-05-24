# Nonaym DIY Phase 10AA — Raspberry Pi / unifipi Read-Only ARM Inventory Comparison

Status: Planning / external ARM comparison

Purpose:
Run the existing Phase 10Q read-only inventory script on the Raspberry Pi known as unifipi to collect an ARM comparison point.

This phase does not install Nonaym DIY.
This phase does not create an installer.
This phase does not write an image.
This phase does not modify DNS, network settings, disks, packages, or services.

## Test target

- Machine name/hostname: UnifiPi.localdomain
- Short name: unifipi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- SSH target: mslepikas@10.1.1.102
- Hardware class: Raspberry Pi / ARM comparison
- Role: external read-only inventory target only

GB10/omnieon remains editing/staging only and must not be used as a Nonaym DIY test target.

## Important positioning

Raspberry Pi is not the first customer baseline for Nonaym DIY.

This test is only to understand ARM/Raspberry Pi behavior compared with the existing x86_64 machines:

- nonaym4 Lenovo baseline
- nonaym1 generic Intel comparison
- nonaym5 Lenovo repeatability check

## Phase 10AA allowed actions

- Copy the existing read-only inventory script to unifipi.
- Run the script on unifipi only.
- Save a local report on unifipi under /tmp.
- Redact sensitive details before documenting.
- Compare ARM/Raspberry Pi results against the x86_64 draft baseline.

## Forbidden actions

- No install behavior.
- No partitioning.
- No formatting.
- No image writing.
- No package installation.
- No DNS changes.
- No service changes.
- No network reconfiguration.
- No reboot.
- No GB10/omnieon test-target use.

## Safe output handling

Before documenting or pasting output, redact:

- Serial numbers
- MAC addresses
- Public IP addresses
- Private IP addresses if not needed
- Usernames if not needed
- Wi-Fi SSIDs
- Any customer-specific identifiers

## Success criteria

Phase 10AA passes when:

- unifipi is confirmed reachable.
- The read-only inventory script runs on unifipi.
- A Raspberry Pi report is created.
- No install behavior occurs.
- No disk/network/service settings are modified.
- The result is documented as ARM comparison only, not first-release baseline.
