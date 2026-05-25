# Nonaym DIY Phase 10DO — Post-Install Baseline Profile for nonaym5

Status: Read-only baseline capture / no service install

Purpose:
Capture the first clean post-install Debian baseline profile for Lenovo nonaym5 after Phase 10DN verified first boot.

This phase does not install packages.
This phase does not install Docker.
This phase does not install Technitium.
This phase does not install Nonaym services.
This phase does not modify DNS, network settings, disks, packages, or services.
This phase does not reboot any machine.
This phase does not touch Protectli / ns2 quantaa.
This phase does not touch omnieon / GB10.

## Prior result

Phase 10DN verified first boot after Debian install.

Known state:
- Machine: Lenovo nonaym5
- User: nonaym5
- Post-install DHCP IP: 192.168.1.222
- Pre-install IP was: 192.168.1.217
- Debian install completed from USB
- Local login worked as nonaym5

## Baseline goals

Capture:

- hostname
- user
- architecture
- kernel
- Debian version
- OS release
- IP addresses
- routes
- DNS resolver status
- storage layout
- root filesystem
- boot mode indicators
- SSH service status
- sudo availability check
- installed package count
- Docker absence/presence
- Technitium absence/presence
- Nonaym workspace/service absence/presence

## Still forbidden in Phase 10DO

- No package installs.
- No Docker install.
- No Technitium install.
- No Nonaym service install.
- No DNS changes.
- No service changes.
- No reboot.
- No action against Protectli / ns2 quantaa.
- No action against omnieon / GB10.
