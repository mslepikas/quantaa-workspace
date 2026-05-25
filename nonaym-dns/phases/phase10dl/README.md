# Nonaym DIY Phase 10DL — Controlled Debian Install Execution Checkpoint

Status: Final install checkpoint / no install yet

Purpose:
Create the final checkpoint before a future manual Debian install execution on Lenovo nonaym5.

This phase does not install Debian.
This phase does not partition disks.
This phase does not format disks.
This phase does not write to nonaym5 internal disk.
This phase does not install packages.
This phase does not modify DNS, network settings, disks, packages, or services.
This phase does not reboot any machine.
This phase does not touch Protectli / ns2 quantaa.
This phase does not touch omnieon / GB10.

## Prior approval

Phase 10DK reviewed the Phase 10DJ controlled Debian install execution plan.

Review result:
- Q: PASS
- Danno: APPROVE

## Target machine

- Machine: Lenovo nonaym5
- Pre-install hostname: nonaym5
- Pre-install login user: nonaym5
- Pre-install LAN IP: 192.168.1.217
- Architecture: x86_64
- Internal disk: nvme0n1
- Internal disk size: 238.5G
- Internal disk model: SAMSUNG MZVLB256HAHQ-000L7
- Boot mode before install: Legacy BIOS or unknown

## Installer media

- Debian 13.5 amd64 netinst USB installer
- Created in Phase 10DD
- Boot confirmed in Phase 10DG
- Graphical installer reached language screen

## Required human approval phrase for future install execution

The future install execution phase must require exact human approval:

I APPROVE INSTALLING DEBIAN TO NONAYM5 INTERNAL DISK

This phrase is not approval in Phase 10DL.

## Final pre-install checklist

Before proceeding to a future install execution phase, confirm:

- Lenovo nonaym5 is physically present.
- USB installer is inserted into nonaym5.
- F12 boot menu works.
- Debian graphical installer starts.
- Operator understands existing nonaym5 OS/data may be erased.
- Expected disk appears in installer:
  - approximately 238.5G
  - Samsung NVMe
  - Lenovo internal disk
- Protectli / ns2 quantaa is not involved.
- omnieon / GB10 is not involved.
- Install choices are ready to be followed.
- Stop point before partition/write confirmation is understood.

## Planned install choices for future execution

Recommended choices:

1. Graphical Install
2. Language: English
3. Location: United States
4. Keyboard: American English / US
5. Network: wired Ethernet if detected
6. Hostname: nonaym5
7. Domain name: leave blank unless required
8. Root password:
   - Prefer leaving root password blank if Debian offers sudo user setup.
   - If root password is required, stop and document before choosing.
9. User full name: Nonaym Test or nonaym5
10. Username: nonaym5
11. Password: set locally; do not paste into chat
12. Time zone: Eastern if prompted
13. Partitioning:
   - Stop at disk selection screen and verify expected disk.
   - Only future approved execution may choose guided use entire disk.
14. Software selection:
   - SSH server
   - standard system utilities
   - avoid desktop environment for minimal baseline unless intentionally chosen
15. Bootloader:
   - Install GRUB to Lenovo internal disk only if prompted and target disk matches expected disk.
16. Reboot:
   - Only after installer completes.
   - Remove USB when instructed.

## Hard stop conditions

Stop if:

- Disk shown is not approximately 238.5G.
- Disk model does not appear to be Samsung NVMe / expected Lenovo internal disk.
- Multiple internal disks appear and target is unclear.
- Installer asks to write partition changes before explicit approval.
- Boot mode / partition scheme is unclear.
- Installer path differs significantly from planned path.
- Any production machine is involved.

## Protected systems

Must not be touched:

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- omnieon / GB10 internal disk
- any other production machine

## Still forbidden in Phase 10DL

- No install.
- No partitioning.
- No formatting.
- No disk write to nonaym5.
- No package installs.
- No DNS changes.
- No service changes.
- No reboot from this phase.
- No action against Protectli / ns2 quantaa.
- No action against omnieon / GB10.

## Future Phase 10DM candidate

Phase 10DM should be the controlled manual Debian install execution phase if the human operator chooses to proceed.

Phase 10DM must require the exact approval phrase before disk partition/write actions:

I APPROVE INSTALLING DEBIAN TO NONAYM5 INTERNAL DISK

## Success criteria

Phase 10DL passes when:
- final install checkpoint is documented
- final checklist is documented
- hard stop conditions are documented
- approval phrase is documented
- no machine is modified
