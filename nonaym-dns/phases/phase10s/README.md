# Nonaym DIY Phase 10S — Minimum Hardware Requirements Draft

Status: Planning / requirements draft

Purpose:
Use the first external inventory result from nonaym4 and future read-only inventory from the generic Intel machine to draft practical minimum hardware requirements for Nonaym DIY.

This phase does not install Nonaym DIY.
This phase does not create an installer.
This phase does not write an image.
This phase does not modify DNS, network settings, disks, packages, or services.

## Current tested baseline

### nonaym4 — Lenovo test machine

Status: Inventory completed in Phase 10R

Observed summary:
- Architecture: x86_64
- CPU: Intel Core i3-6100 CPU @ 3.70GHz
- CPU count shown: 4
- RAM: 7.1 GiB
- Swap: 4.0 GiB
- Boot mode: Legacy BIOS or unknown
- Storage: 238.5G Samsung NVMe
- Root filesystem: Ubuntu LVM, 100G mounted at /
- Network: wired Ethernet interface present

Interpretation:
nonaym4 is a reasonable first x86_64 Lenovo baseline for Nonaym DIY planning.

## Available comparison machines

### generic Intel / nonaym1

Status: Available for testing

Purpose:
Use as the next external read-only inventory target to compare against nonaym4.

### nonaym5

Status: Available, believed to be same/similar class as nonaym4

Purpose:
Hold as repeatability check after generic Intel testing. Do not prioritize before nonaym1 unless needed.

### Protectli 2420 / ns2quantaa

Status: Available later

Purpose:
Dedicated appliance-style comparison.

### Raspberry Pi 5

Status: Available later

Purpose:
ARM comparison. Do not use as the first baseline because the first DIY target should confirm common x86_64 behavior.

## Draft requirement categories

Initial requirement areas to define:

- CPU architecture
- CPU generation/performance class
- RAM minimum
- Storage minimum
- Storage type preference
- Wired Ethernet requirement
- Boot mode support
- Installer/image compatibility
- Expected user skill level
- Unsupported/needs-review hardware

## Early draft minimums

Conservative initial draft, subject to more testing:

- Architecture: x86_64 preferred for first DIY release
- CPU: Intel Core 6th Gen or similar/better
- RAM: 4GB minimum, 8GB recommended
- Storage: 64GB minimum, 128GB+ recommended
- Network: wired Ethernet strongly recommended
- Boot: UEFI preferred, Legacy BIOS may be supported after testing
- Disk type: SSD/NVMe preferred over old spinning HDD
- Wi-Fi-only systems: needs review, not first baseline

## Phase 10S success criteria

Phase 10S passes when:

- nonaym4 is documented as first baseline.
- generic Intel / nonaym1 is selected as next comparison target.
- minimum hardware requirements are drafted but not finalized.
- no install-capable behavior is added.
- GB10/omnieon remains editing/staging only.
