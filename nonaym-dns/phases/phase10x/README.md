# Nonaym DIY Phase 10X — Three-Machine Hardware Requirements Update

Status: Documentation draft

Purpose:
Update the Nonaym DIY internal hardware requirements using three external read-only inventory results:

- nonaym4: Lenovo x86_64 baseline
- nonaym1: generic Intel x86_64 comparison
- nonaym5: Lenovo repeatability check

This phase does not install Nonaym DIY.
This phase does not create an installer.
This phase does not write an image.
This phase does not modify DNS, network settings, disks, packages, or services.

## Tested machines

### nonaym4 — Lenovo baseline

- Architecture: x86_64
- CPU: Intel Core i3-6100 CPU @ 3.70GHz
- CPU count shown: 4
- RAM: 7.1 GiB
- Swap: 4.0 GiB
- Boot mode: Legacy BIOS or unknown
- Storage: 238.5G Samsung NVMe
- Root filesystem: Ubuntu LVM, 100G mounted at /
- Network: wired Ethernet present

### nonaym1 — generic Intel comparison

- Architecture: x86_64
- CPU: Intel Core i5-3317U CPU @ 1.70GHz
- CPU count shown: 4
- RAM: 7.7 GiB
- Swap: 6.1 GiB
- Boot mode: Legacy BIOS or unknown
- Storage: 119.2G SATA SSD
- Root filesystem: 113.2G partition mounted at /
- Network: wired Ethernet present
- Note: Docker networking was present on the system

### nonaym5 — Lenovo repeatability check

- Architecture: x86_64
- CPU: Intel Core i3-6100 CPU @ 3.70GHz
- CPU count shown: 4
- RAM: 7.7 GiB
- Swap: 7.9 GiB
- Boot mode: Legacy BIOS or unknown
- Storage: 238.5G Samsung NVMe
- Root filesystem: LVM root, 229.6G mounted at /
- Network: wired Ethernet present

## Findings from three-machine sample

### Confirmed

- All three tested machines are x86_64.
- All three have wired Ethernet.
- All three have SSD or NVMe storage.
- All three are around 8GB RAM class.
- All three reported Legacy BIOS or unknown boot mode.
- The Lenovo baseline is repeatable across nonaym4 and nonaym5.
- The older generic Intel machine still fits the early DIY target range.

### Not yet confirmed

- UEFI behavior.
- ARM/Raspberry Pi behavior.
- Wi-Fi-only behavior.
- Low-RAM behavior under 4GB.
- Small-storage behavior under 64GB.
- Old spinning hard drive behavior.
- Appliance-style behavior on Protectli 2420.
- Actual install/image behavior. That remains forbidden for now.

## Updated internal draft requirements

These are internal draft requirements only.
They are not final customer-facing claims.

### Minimum draft

- Architecture: x86_64
- CPU: Intel Core-class 64-bit CPU or similar
- RAM: 4GB minimum
- Storage: 64GB minimum
- Storage type: SSD strongly preferred
- Network: wired Ethernet strongly recommended
- Boot mode: Legacy BIOS or UEFI may be possible, but both need more validation
- Dedicated target machine strongly recommended
- User must be comfortable booting from USB and identifying the correct machine

### Recommended draft

- Architecture: x86_64
- CPU: Intel Core 6th Gen or newer, or similar/better
- RAM: 8GB recommended
- Storage: 128GB or larger SSD/NVMe recommended
- Network: wired Ethernet
- Boot mode: UEFI preferred, Legacy BIOS still under validation
- Storage condition: healthy SSD/NVMe preferred over aging hard drive
- Dedicated device: recommended, not a daily-use workstation

## Hardware categories

### Good early DIY candidates

- Small-form-factor x86_64 desktops
- Lenovo Tiny / ThinkCentre-style machines
- Generic Intel machines with SSD storage
- Machines with wired Ethernet
- Machines with 8GB RAM and 128GB+ SSD/NVMe

### Needs review

- Wi-Fi-only machines
- ARM/Raspberry Pi systems
- Machines with exactly 4GB RAM
- Machines with 64GB storage
- Legacy BIOS-only machines
- Machines with unusual network adapters
- Machines with existing Docker/network overlays

### Not recommended for first release

- Production workstations
- Daily-use personal computers
- Customer machines without a backup/recovery plan
- Machines with less than 4GB RAM
- Machines with less than 64GB storage
- Old spinning hard drives
- Machines without reliable wired Ethernet
- Any machine where the user cannot clearly identify the target disk

## Privacy / redaction requirement

Raw inventory outputs may include:
- MAC addresses
- LAN IPs
- Hostnames
- Storage model details
- Docker bridge/interface details
- Local network details

Before public use:
- Redact MAC addresses.
- Redact local IPs unless needed.
- Redact serial numbers.
- Redact customer-specific identifiers.
- Keep all requirements labeled draft until more validation is complete.

## Phase 10X conclusion

The three-machine sample strengthens the internal draft:

- x86_64 should remain the first DIY release target.
- 4GB RAM minimum and 8GB recommended remain reasonable.
- 64GB SSD minimum and 128GB+ SSD/NVMe recommended remain reasonable.
- Wired Ethernet should remain strongly recommended.
- Legacy BIOS should remain tentative but not excluded yet.
- UEFI should remain preferred but needs actual validation.
- Protectli 2420 should be the next useful test target for appliance-style comparison.
- Raspberry Pi should remain a later ARM comparison, not first customer baseline.

## Recommended next phase

Phase 10Y should prepare a Q/Danno review packet for this three-machine hardware requirements update.

The review should ask:
- Are the three-machine requirements defensible?
- Is Protectli 2420 the right next test target?
- Is any wording too strong for customer-facing use?
- What must remain internal-only?
- What minimum requirements should be tested next?

## Phase 10X success criteria

Phase 10X passes when:
- nonaym4, nonaym1, and nonaym5 results are summarized together.
- Updated hardware requirements are documented.
- Unsupported and needs-review hardware categories are documented.
- No install behavior is added.
- GB10/omnieon remains editing/staging only.
