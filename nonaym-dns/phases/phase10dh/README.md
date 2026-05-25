# Nonaym DIY Phase 10DH — Lenovo Install-Path Safety Plan

Status: Install-path planning only / no install

Purpose:
Plan the next gated step after Phase 10DG confirmed that Lenovo nonaym5 successfully boots from the Debian 13.5 amd64 USB installer.

This phase does not install Debian.
This phase does not partition disks.
This phase does not format disks.
This phase does not write to nonaym5 internal disk.
This phase does not install packages.
This phase does not modify DNS, network settings, disks, packages, or services.
This phase does not reboot any machine.
This phase does not touch Protectli / ns2 quantaa.

## Prior result

Phase 10DG passed.

Observed:
- F12 presented a Lenovo boot menu.
- USB boot option was selectable.
- Debian installer started.
- Debian graphical installer appeared.
- Installer proceeded to language selection.
- Audio played through the internal speaker.
- No install/partition/format action was reported.

## Target machine

- Machine: Lenovo nonaym5
- Login user before install: nonaym5
- LAN IP before install: 192.168.1.217
- Hostname before install: nonaym5
- Architecture: x86_64
- Current internal disk: nvme0n1
- Current disk size: 238.5G
- Current disk model: SAMSUNG MZVLB256HAHQ-000L7
- Current boot mode observed before test: Legacy BIOS or unknown

## Install-path decision needed

Before any install is approved, decide whether nonaym5 internal disk may be overwritten.

Potential install choice:

- Use entire Lenovo internal disk
- Allow Debian installer to create partitions
- Allow installer to format internal disk
- Install base Debian system
- Later add Nonaym services in separate phases

This must be explicitly approved before proceeding.

## Recommended first install path

For the first Lenovo/nonaym5 install test, the recommended path is:

- Debian graphical install
- English language
- US keyboard unless otherwise needed
- Wired network if available
- Use entire disk only if human operator confirms nonaym5 may be erased
- Do not enable extra desktop environment unless intentionally chosen
- Prefer minimal/server style install if options appear
- Do not install Nonaym DNS services yet
- Stop after base OS install and first boot verification

## Critical warning

Installing Debian on nonaym5 may erase the existing OS and data on:

- /dev/nvme0n1
- 238.5G SAMSUNG MZVLB256HAHQ-000L7

Do not proceed until explicitly approved.

## Required human approval phrase for future install phase

A future install phase should require exact human approval:

I APPROVE INSTALLING DEBIAN TO NONAYM5 INTERNAL DISK

This approval is not given in Phase 10DH.

## Installer screens to document before disk changes

Before choosing any disk/partition option, document:

- language screen
- keyboard screen
- network screen
- hostname prompt
- user/password prompts
- disk selection screen
- partitioning method screen
- exact disk shown by installer
- whether disk size/model matches expected Lenovo internal disk

## Disk selection safety rule

The installer must show the expected Lenovo internal disk:

- approximately 238.5G
- Samsung NVMe
- expected target: nonaym5 internal nvme0n1

If the disk shown does not match expected size/model, stop.

## Protected systems

The following must not be touched:

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- omnieon / GB10 internal disk
- any other production machine

## Still forbidden in Phase 10DH

- No install.
- No partitioning.
- No formatting.
- No disk write to nonaym5.
- No package installs.
- No DNS changes.
- No service changes.
- No action against Protectli / ns2 quantaa.

## Future Phase 10DI candidate

Phase 10DI should be Q/Danno review of this Lenovo install-path safety plan.

Only after review and human approval should a controlled install phase be considered.

## Success criteria

Phase 10DH passes when:
- install-path risks are documented
- recommended installer choices are documented
- approval phrase is documented
- disk safety stop rules are documented
- no machine is modified
