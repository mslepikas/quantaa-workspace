# Nonaym DIY Phase 10DM — Controlled Manual Debian Install Execution

Status: Manual install execution phase

Purpose:
Perform the controlled manual Debian install on Lenovo nonaym5 using the Debian 13.5 amd64 USB installer.

This phase allows Debian installation only on the approved Lenovo nonaym5 internal disk after explicit human approval.

## Approved target

- Machine: Lenovo nonaym5
- Expected internal disk: nvme0n1
- Expected size: approximately 238.5G
- Expected model: SAMSUNG MZVLB256HAHQ-000L7
- Architecture: x86_64

## Protected systems

Do not touch:

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- omnieon / GB10 internal disk
- any other production machine

## Required human approval phrase

Before selecting any installer option that writes partitions, formats disk, or installs Debian to internal disk, the human operator must approve:

I APPROVE INSTALLING DEBIAN TO NONAYM5 INTERNAL DISK

## Approved install path

Use the Debian graphical installer.

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
   - If root password is required and unclear, stop and document.
9. User full name: Nonaym Test or nonaym5
10. Username: nonaym5
11. Password: set locally; do not paste into chat
12. Time zone: Eastern if prompted
13. Partitioning:
   - Confirm disk is approximately 238.5G Samsung NVMe.
   - If confirmed and approved, use Guided - use entire disk.
   - If installer asks to write changes to disk, confirm approval phrase first.
14. Software selection:
   - SSH server
   - standard system utilities
   - avoid desktop environment unless intentionally chosen
15. Bootloader:
   - Install GRUB to Lenovo internal disk only if target disk matches expected disk.
16. Finish installation:
   - Reboot only when installer completes.
   - Remove USB when instructed.

## Hard stop conditions

Stop if:

- Disk shown is not approximately 238.5G.
- Disk model does not appear to be Samsung NVMe / expected Lenovo internal disk.
- Multiple internal disks appear and target is unclear.
- Installer path differs significantly from planned path.
- Boot mode / partition scheme looks confusing.
- Any production machine is involved.

## Result documentation

After install attempt, document:

- whether install started
- disk shown by installer
- partitioning choice used
- whether install completed
- whether reboot occurred
- whether USB was removed
- whether first boot reached Debian login
- any errors
