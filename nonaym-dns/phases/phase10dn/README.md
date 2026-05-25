# Nonaym DIY Phase 10DN — First Boot Verification After Debian Install

Status: Read-only verification / no service install

Purpose:
Verify that Lenovo nonaym5 boots from internal disk after the Phase 10DM Debian install.

This phase does not install Nonaym services.
This phase does not install packages.
This phase does not modify DNS, network settings, disks, packages, or services.
This phase does not reboot any machine.
This phase does not touch Protectli / ns2 quantaa.
This phase does not touch omnieon / GB10.

## Prior result

Phase 10DM completed the Debian install on Lenovo nonaym5.

Observed:
- Debian installer completed.
- USB removed before reboot.
- Reboot completed.
- Local login worked as user nonaym5.
- New DHCP IP observed locally with ip addr: 192.168.1.222.

## Pre-install versus post-install IP

- Old pre-install IP: 192.168.1.217
- New post-install DHCP IP: 192.168.1.222

## UX observation

The Debian install was manageable for an engineer, but would be overwhelming for a beginner.

Future Nonaym DIY website/customer flow should simplify:
- account/password explanation
- partitioning confirmations
- mirror/proxy/package manager choices
- software selection with space/tab instructions
- GRUB bootloader choice
- final remove-USB-and-reboot instruction

## Verification goals

Confirm:

- nonaym5 boots from internal disk
- login prompt appears
- SSH works
- IP address is known
- Debian version is known
- disk layout is known
- SSH server is running
- no Nonaym services are installed yet

## Still forbidden in Phase 10DN

- No package installs.
- No Docker install.
- No Technitium install.
- No Nonaym service install.
- No DNS changes.
- No service changes.
- No reboot.
- No action against Protectli / ns2 quantaa.
- No action against omnieon / GB10.
