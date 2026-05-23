# Phase 10L — Nonaym DIY Public Package ARM64 Regression

Date: 2026-05-23

## Purpose

Validate the live public Nonaym DIY Phase 10K preflight package on the Raspberry Pi / ARM64 path.

This confirms that the same public package works on both:

- x86_64 hardware
- Raspberry Pi ARM64 hardware

## Safety

This was a read-only preflight test.

No packages were installed.
No Docker changes were made.
No Technitium changes were made.
No DNS changes were made.
No network settings were changed.
No disks were formatted or modified.

## Public Package Tested

Package:

https://nonaym.ai/download/files/nonaym-diy-preflight-phase10k.tar.gz

Checksum:

https://nonaym.ai/download/files/nonaym-diy-preflight-phase10k.tar.gz.sha256

Checksum result:

PASS

## Test Target

Hostname:

UnifiPi

IP:

10.1.1.102

Device class:

Raspberry Pi 5 / ARM64

OS:

Debian GNU/Linux 13 (trixie)

Architecture:

aarch64

## Report

Report copied to:

reports/phase10l-public-package-raspberry-pi/nonaym-hardware-report-20260523-113518.txt

## Observed Result

- Script version: phase10j-v2.1
- OS: Debian GNU/Linux 13 (trixie)
- Architecture: aarch64
- CPU cores: 4
- Memory: 7GB
- Detected total disk capacity: 240GB
- Root filesystem free: 209GB
- Ethernet adapters detected: 1
- Wi-Fi adapters detected: 1
- Raspberry Pi detected: yes
- Recommended Profile: Raspberry Pi / ARM64 Profile
- NONAYM DIY RESULT: PASS
- Warnings: none

## Decision

Phase 10L result:

PASS

The live public Phase 10K preflight package successfully passed ARM64/Raspberry Pi regression testing.

## Phase 10L Conclusion

The public package is now validated on:

- x86_64 via nonaym4
- ARM64 Raspberry Pi via UnifiPi

## Recommended Next Phase

Phase 10M — Installer Planning Gate

Purpose:

Define exactly what a future real Nonaym DIY installer is allowed to do before any install-capable image or script is built.
