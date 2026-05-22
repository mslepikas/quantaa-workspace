# Phase 10B — Nonaym DIY Read-Only Preflight Script

Date: 2026-05-22

## Purpose

Create the first read-only Nonaym DIY hardware inventory and install recommendation script.

Script:

scripts/nonaym-diy-preflight.sh

## Safety rules

This phase is read-only.

The script must not:

- install packages
- install Docker
- start Technitium
- stop Technitium
- format disks
- change partitions
- change DNS
- change network settings
- change systemd-resolved
- change firewall rules
- write outside the project reports directory

## Report output

Reports are saved under:

reports/

Example:

reports/nonaym-hardware-report-YYYYMMDD-HHMMSS.txt

## Intended test machines

1. Raspberry Pi
2. Protectli 2420
3. Generic Intel machine
4. Lenovo computer #1
5. Lenovo computer #2

## Install profiles

The script recommends one of:

- Raspberry Pi / ARM64 Profile
- Standard x86_64 Profile
- Lightweight x86_64 Profile
- ARM Caution / Not Recommended
- x86_64 Caution / Not Recommended
- Unsupported Architecture

## Current status

This script is a first draft for local testing.

It does not build the downloadable image yet.

It does not replace the existing Technitium setup script yet.

## Next phase

Phase 10C should create the flash-drive test checklist and define the one-machine-at-a-time test order.
