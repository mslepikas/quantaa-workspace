# Nonaym DIY Phase 10W — nonaym5 Read-Only Inventory Repeatability Check

Status: Planning / external test preparation

Purpose:
Run the existing Phase 10Q read-only inventory script on nonaym5 to confirm repeatability against the prior nonaym4 Lenovo baseline and nonaym1 generic Intel comparison.

This phase does not install Nonaym DIY.
This phase does not create an installer.
This phase does not write an image.
This phase does not modify DNS, network settings, disks, packages, or services.

## Prior review status

Phase 10V Q/Danno review gate passed.

- Q technical review: technically sound
- Danno safety review: APPROVE
- Recommended next target: nonaym5 repeatability check

## Test target

- Machine name: nonaym5
- Login user: nonaym5
- LAN IP: 192.168.1.217
- SSH target: nonaym5@192.168.1.217
- Machine type: Lenovo/similar test machine
- Role: third external Nonaym DIY read-only inventory target and repeatability check

GB10/omnieon remains editing/staging only and must not be used as a Nonaym DIY test target.

## Comparison baselines

### nonaym4 baseline

- CPU: Intel Core i3-6100 CPU @ 3.70GHz
- RAM: 7.1 GiB
- Storage: 238.5G Samsung NVMe
- Boot mode: Legacy BIOS or unknown
- Network: wired Ethernet present

### nonaym1 comparison

- CPU: Intel Core i5-3317U CPU @ 1.70GHz
- RAM: 7.7 GiB
- Storage: 119.2G SATA SSD
- Boot mode: Legacy BIOS or unknown
- Network: wired Ethernet present

## Phase 10W allowed actions

- Copy the existing read-only inventory script to nonaym5.
- Run the script on nonaym5 only.
- Save a local report on nonaym5 under /tmp.
- Redact sensitive details before documenting.
- Compare nonaym5 against nonaym4 and nonaym1.

## Forbidden actions

- No install behavior.
- No partitioning.
- No formatting.
- No image writing.
- No package installation.
- No DNS changes.
- No service changes.
- No network reconfiguration.
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

Phase 10W passes when:

- nonaym5 is confirmed reachable.
- The read-only inventory script runs on nonaym5.
- A nonaym5 report is created.
- No install behavior occurs.
- No disk/network/service settings are modified.
- A repeatability comparison summary is documented.
