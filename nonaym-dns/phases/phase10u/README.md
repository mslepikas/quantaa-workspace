# Nonaym DIY Phase 10U — Minimum Hardware Requirements Update

Status: Documentation draft

Purpose:
Update the Nonaym DIY minimum hardware requirements using the first two external read-only inventory results:

- nonaym4: Lenovo x86_64 baseline
- nonaym1: generic Intel x86_64 comparison machine

This phase does not install Nonaym DIY.
This phase does not create an installer.
This phase does not write an image.
This phase does not modify DNS, network settings, disks, packages, or services.

## Prior review gate

Phase 10S Q/Danno review passed.

- Q technical review: supportive / technically sound
- Danno safety review: APPROVE
- Human gate: approved read-only comparison testing

## Tested machines so far

### nonaym4 — Lenovo baseline

Inventory result:
- Architecture: x86_64
- CPU: Intel Core i3-6100 CPU @ 3.70GHz
- CPU count shown: 4
- RAM: 7.1 GiB
- Swap: 4.0 GiB
- Boot mode: Legacy BIOS or unknown
- Storage: 238.5G Samsung NVMe
- Root filesystem: Ubuntu LVM, 100G mounted at /
- Network: wired Ethernet present

Interpretation:
nonaym4 is a stronger first baseline with NVMe storage and a 6th Gen Intel desktop-class CPU.

### nonaym1 — generic Intel comparison

Inventory result:
- Architecture: x86_64
- CPU: Intel Core i5-3317U CPU @ 1.70GHz
- CPU count shown: 4
- RAM: 7.7 GiB
- Swap: 6.1 GiB
- Boot mode: Legacy BIOS or unknown
- Storage: 119.2G SATA SSD
- Root filesystem: 113.2G partition mounted at /
- Network: wired Ethernet present
- Extra local note: Docker networking was present on the system

Interpretation:
nonaym1 is an older/lower-power Intel machine than nonaym4, but still meets the early draft direction because it has x86_64 architecture, approximately 8GB RAM, SSD storage above 64GB, and wired Ethernet.

## Updated draft hardware requirements

These are internal draft requirements only. They are not final customer-facing claims.

### Minimum draft

- Architecture: x86_64
- CPU: Intel Core-class 64-bit CPU or similar
- RAM: 4GB minimum
- Storage: 64GB minimum
- Storage type: SSD strongly preferred
- Network: wired Ethernet strongly recommended
- Boot mode: Legacy BIOS or UEFI may be possible, but both need more testing
- Display/keyboard: may be needed during DIY install/testing
- Skill level: user must be comfortable booting from USB and identifying the correct machine

### Recommended draft

- Architecture: x86_64
- CPU: Intel Core 6th Gen or newer, or similar/better
- RAM: 8GB recommended
- Storage: 128GB or larger SSD/NVMe recommended
- Network: wired Ethernet
- Boot mode: UEFI preferred, Legacy BIOS supported only after more validation
- Storage condition: healthy SSD/NVMe preferred over aging hard drive
- Dedicated device: recommended, not a daily-use workstation

## Unsupported or needs-review hardware

The following should not be treated as first-release customer baseline yet:

- Wi-Fi-only machines
- ARM/Raspberry Pi systems
- Machines with less than 4GB RAM
- Machines with less than 64GB storage
- Machines using old spinning hard drives
- Machines without reliable wired Ethernet
- Production workstations
- Customer machines without a backup/recovery plan
- Any system where the user cannot clearly identify the target disk

## Current conclusions

Based on nonaym4 and nonaym1:

1. x86_64 should remain the first DIY release target.
2. 4GB RAM is a reasonable minimum draft, but 8GB should be recommended.
3. 64GB SSD is a reasonable minimum draft, but 128GB+ should be recommended.
4. Wired Ethernet should remain strongly recommended.
5. Legacy BIOS appears in both early test machines, so Legacy BIOS cannot be dismissed yet.
6. UEFI should remain preferred, but not required until more testing is complete.
7. nonaym5 can be used later as a repeatability check.
8. Protectli 2420 should be used later as an appliance-style comparison.
9. Raspberry Pi should remain a later ARM comparison, not first customer baseline.

## Next recommended phase

Phase 10V should prepare a Q/Danno-reviewed requirements update packet.

The next review should ask:

- Are the minimum/recommended requirements defensible from two test machines?
- Is the wording safe for internal documentation?
- What claims should not be published yet?
- Should nonaym5 or Protectli be the next test target?
- Should Legacy BIOS support remain tentative?

## Phase 10U success criteria

Phase 10U passes when:

- nonaym4 and nonaym1 results are summarized together.
- Draft minimum/recommended hardware requirements are updated.
- Unsupported/needs-review hardware is documented.
- No install behavior is added.
- GB10/omnieon remains editing/staging only.
