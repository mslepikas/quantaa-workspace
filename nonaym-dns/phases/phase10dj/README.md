# Nonaym DIY Phase 10DJ — Controlled Debian Install Execution Plan for nonaym5

Status: Install execution planning only / no install

Purpose:
Prepare the controlled Debian install execution plan for Lenovo nonaym5 after Phase 10DI Q/Danno approval of the install-path safety plan.

This phase does not install Debian.
This phase does not partition disks.
This phase does not format disks.
This phase does not write to nonaym5 internal disk.
This phase does not install packages.
This phase does not modify DNS, network settings, disks, packages, or services.
This phase does not reboot any machine.
This phase does not touch Protectli / ns2 quantaa.

## Prior approval

Phase 10DI reviewed and approved the Lenovo install-path safety plan.

Review result:
- Q: PASS
- Danno: APPROVE

## Target machine

- Machine: Lenovo nonaym5
- Login user before install: nonaym5
- LAN IP before install: 192.168.1.217
- Hostname before install: nonaym5
- Architecture: x86_64
- Internal disk: nvme0n1
- Internal disk size: 238.5G
- Internal disk model: SAMSUNG MZVLB256HAHQ-000L7
- Boot mode observed before install: Legacy BIOS or unknown

## Installer media

Created in Phase 10DD:

- Debian 13.5 amd64 netinst USB installer
- Boot confirmed in Phase 10DG
- Graphical Debian installer reached language screen
- No install occurred in Phase 10DG

## Controlled install goal

Install a clean minimal Debian base system on Lenovo nonaym5 as the first x86_64 Nonaym DIY test target.

This is not yet the final Nonaym customer installer.
This is a technical validation install.

## Required human approval phrase for future execution

The future install execution phase must require exact human approval:

I APPROVE INSTALLING DEBIAN TO NONAYM5 INTERNAL DISK

This approval is not given in Phase 10DJ.

## Pre-install confirmation checklist

Before any install execution phase, confirm:

- nonaym5 is physically present and intended as the test target.
- USB installer is inserted into nonaym5.
- nonaym5 booted from USB installer.
- Debian installer is visible.
- The operator understands existing data/OS on nonaym5 may be erased.
- The expected disk is visible:
  - approximately 238.5G
  - Samsung NVMe
  - expected target: internal nonaym5 nvme0n1
- Protectli / ns2 quantaa is not involved.
- omnieon / GB10 is not involved.

## Installer path to use

Recommended installer choices for first controlled install:

1. Graphical Install
2. Language: English
3. Location: United States
4. Keyboard: American English / US
5. Network: wired Ethernet if detected
6. Hostname: nonaym5
7. Domain name: leave blank unless installer requires a value
8. Root password:
   - Prefer leaving root password blank if Debian offers sudo setup for the user.
   - If root password is required, stop and document before choosing.
9. User full name: Nonaym Test or nonaym5
10. Username: nonaym5
11. Password: choose locally and do not paste password into chat
12. Time zone: Eastern if prompted
13. Partitioning:
   - Do not proceed until the disk selection screen is documented.
   - Future execution phase may approve "Guided - use entire disk" only for the expected 238.5G Samsung NVMe.
14. Software selection:
   - Prefer SSH server and standard system utilities.
   - Avoid desktop environment for minimal Nonaym DIY baseline unless intentionally chosen.
15. Bootloader:
   - Install GRUB to the Lenovo internal disk if prompted and disk matches expected target.
16. First boot:
   - Reboot only after installer completes.
   - Remove USB when instructed.
   - Document first boot.

## Mandatory stop before disk write

Stop at the partitioning/disk selection screen if:

- disk size does not match approximately 238.5G
- disk model does not appear to be Samsung NVMe / expected Lenovo internal disk
- installer shows multiple internal disks and target is unclear
- installer asks to write partition changes before explicit approval phase
- boot mode/partition scheme is unclear enough to create risk

## Boot mode note

Danno noted boot mode is currently "Legacy BIOS or unknown."

Future install execution should document:
- whether installer appears to boot in BIOS/Legacy mode
- whether installer appears to boot in UEFI mode
- whether the installer proposes MBR or GPT
- whether GRUB target is clear

Do not force a partition scheme in this planning phase.

## Protected systems

The following must not be touched:

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- omnieon / GB10 internal disk
- any other production machine

## Still forbidden in Phase 10DJ

- No install.
- No partitioning.
- No formatting.
- No disk write to nonaym5.
- No package installs.
- No DNS changes.
- No service changes.
- No action against Protectli / ns2 quantaa.
- No action against omnieon / GB10.

## Future Phase 10DK candidate

Phase 10DK should be Q/Danno review of this controlled Debian install execution plan.

Only after Q/Danno review and explicit human approval should a controlled install execution phase be considered.

## Success criteria

Phase 10DJ passes when:
- controlled install choices are documented
- pre-install checklist is documented
- disk stop rules are documented
- approval phrase is documented
- boot mode caution is carried forward
- no machine is modified
