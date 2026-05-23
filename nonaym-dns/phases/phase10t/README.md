# Nonaym DIY Phase 10T — nonaym1 Generic Intel Read-Only Inventory Comparison

Status: Planning / external test preparation

Purpose:
Run the existing Phase 10Q read-only inventory script on the generic Intel machine known as nonaym1, then compare its hardware profile against the first Lenovo baseline from nonaym4.

This phase does not install Nonaym DIY.
This phase does not create an installer.
This phase does not write an image.
This phase does not modify DNS, network settings, disks, packages, or services.

## Review status

Phase 10S Q/Danno review gate passed.

- Q technical review: supportive / technically sound
- Danno safety review: APPROVE
- Human gate: proceed to nonaym1 read-only comparison

## Test target

- Machine name: nonaym1
- Login user: nonaym1
- LAN IP: 192.168.1.211
- SSH target: nonaym1@192.168.1.211
- Machine type: generic Intel test machine
- Role: second external Nonaym DIY read-only inventory comparison target

GB10/omnieon remains editing/staging only and must not be used as a Nonaym DIY test target.

## Baseline for comparison

### nonaym4 result

- Machine type: Lenovo test machine
- Architecture: x86_64
- CPU: Intel Core i3-6100 CPU @ 3.70GHz
- CPU count shown: 4
- RAM: 7.1 GiB
- Swap: 4.0 GiB
- Boot mode: Legacy BIOS or unknown
- Storage: 238.5G Samsung NVMe
- Root filesystem: Ubuntu LVM, 100G mounted at /
- Network: wired Ethernet interface present

## Phase 10T allowed actions

- Copy the existing read-only inventory script to nonaym1.
- Run the script on nonaym1 only.
- Save a local report on nonaym1 under /tmp.
- Redact sensitive details before documenting.
- Compare nonaym1 against nonaym4 for minimum hardware planning.

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

Phase 10T passes when:

- nonaym1 is confirmed reachable.
- The read-only inventory script runs on nonaym1.
- A nonaym1 report is created.
- No install behavior occurs.
- No disk/network/service settings are modified.
- A comparison summary between nonaym1 and nonaym4 is documented.
