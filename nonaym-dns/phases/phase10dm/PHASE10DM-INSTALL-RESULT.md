# Nonaym DIY Phase 10DM — Manual Debian Install Result

Status: Install completed / reboot initiated

Date: 2026-05-25

## Summary

The controlled manual Debian install was performed on Lenovo nonaym5 using the Debian 13.5 amd64 USB installer.

The installer proceeded through partitioning, package mirror selection, software selection, GRUB bootloader installation, and final reboot prompt.

## Installer observations

The operator observed:

- A couple of create-user/password prompts appeared.
- This was unexpected and felt like the installer asked for user/password information twice.
- Several disk partitioning prompts appeared.
- Operator answered yes at each partition/write prompt.
- Installation started after partitioning confirmation.

## Mirror/package manager choices

- Mirror country: United States
- Package mirror: debian.org
- Proxy: none / blank
- Popularity contest: no

## Software selection

Selected using space bar and tab to continue:

- SSH server
- standard system utilities

Not selected:

- desktop environment

## Bootloader

- GRUB bootloader prompt appeared.
- Operator selected yes.
- Operator selected the internal drive as GRUB target.

## Finish/reboot

- Installer prompted to remove installation media.
- USB media was removed.
- Operator used Tab to continue and pressed Enter.
- Reboot was initiated.

## UX lessons

Future Nonaym DIY guided installer/customer instructions should explain:

- Debian may ask for root password and user password separately.
- If root password is left blank, Debian may enable sudo for the created user.
- Partitioning screens may ask for confirmation more than once.
- The customer should only answer yes after confirming the target disk.
- Software selection uses the space bar to toggle choices and Tab to move to Continue.
- For the first Nonaym DIY baseline, select only:
  - SSH server
  - standard system utilities

## Safety status

- Install was performed on intended Lenovo nonaym5 path.
- Protectli / ns2 quantaa / 10.1.1.109 was not touched.
- omnieon / GB10 was not touched.
- USB was removed before reboot.

## Next phase

Phase 10DN should verify first boot after install:

- Does nonaym5 boot from internal disk?
- Does login prompt appear?
- Can the operator log in as nonaym5?
- Does SSH work?
- What IP address does nonaym5 receive?
- What does lsblk show after install?
- What Debian version/kernel is installed?
