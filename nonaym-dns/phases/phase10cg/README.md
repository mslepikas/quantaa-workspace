# Nonaym DIY Phase 10CG — Pivot to Lenovo nonaym5 First-Boot Target

Status: Planning / read-only verification only

Purpose:
Pivot the next Nonaym DIY write/boot test from Raspberry Pi / UnifiPi NVMe to Lenovo nonaym5 because the Raspberry Pi NVMe path introduced boot complexity.

## Raspberry Pi result

Phase 10CE successfully wrote the Raspberry Pi OS Lite image to the UnifiPi NVMe target.

Phase 10CF showed first boot is blocked or not straightforward, likely due to Raspberry Pi NVMe boot complexity, EEPROM/boot order, or first-boot configuration requirements.

This is not considered a total failure.

The Pi test proved:
- image download/checksum workflow
- gated write script workflow
- SSH write pipeline
- protected target controls
- successful write to intended test target

## New target

- Machine: Lenovo nonaym5
- LAN IP: 192.168.1.217
- Role: next first-boot Nonaym DIY install/write test candidate
- Rationale: simpler PC-style boot path than Raspberry Pi NVMe

## Protected production target

The following remains no-write production:

- Protectli 2420 / ns2 quantaa / 10.1.1.109

Hard rules:
- no write
- no script copy
- no reboot
- no DNS/network/service changes
- no install testing
- no use as a target

## Phase 10CG allowed actions

- Document pivot decision.
- Run ping/SSH reachability checks to nonaym5.
- Run read-only inventory if reachable.
- Document hardware/storage/boot details.
- Determine whether nonaym5 is a better first PC-style write/boot target.

## Still forbidden in Phase 10CG

- No image writing.
- No flashing.
- No partitioning.
- No formatting.
- No image mounting.
- No package installs.
- No DNS changes.
- No service changes.
- No network reconfiguration.
- No reboot.
- No write action against nonaym5.
- No action against Protectli / ns2 quantaa.

## Success criteria

Phase 10CG passes when:
- Pivot decision is documented.
- nonaym5 reachability is checked.
- nonaym5 read-only hardware/storage details are collected if reachable.
- No machine is modified.
