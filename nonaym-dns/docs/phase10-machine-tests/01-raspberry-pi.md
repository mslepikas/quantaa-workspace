# Nonaym DIY Machine Test — Raspberry Pi 5

Date: 2026-05-22 2026-05-22 2026-05-22

## Machine

Manufacturer: Raspberry Pi Raspberry Pi Raspberry Pi
Model: Raspberry Pi 5 / UnifiPi Raspberry Pi 5 
CPU: ARM64, 4 cores Broadcom ARM64, exact details to be confirmed by preflight 
RAM: 7GB detected To be confirmed by preflight 
Storage: Boot media used for Raspberry Pi OS test To be confirmed 
Ethernet: Available Yes, expected 
Wi-Fi: Available Yes, expected 
Boot mode: Raspberry Pi firmware / ARM boot path Raspberry Pi firmware / ARM boot path 
Secure Boot: Not applicable for this Phase 10D test Not expected / not same as PC Secure Boot 

## Flash Drive

Image/version: Existing Raspberry Pi OS test environment Raspberry Pi OS or current test boot media, to be confirmed 
Flash drive: 
Flashing tool: 
Checksum verified: 

## Boot Result

Boot success: yes 
Boot notes: Raspberry Pi 5 booted successfully as UnifiPi 
BIOS/UEFI changes: none 
Internal disk touched: no — preflight only

## Preflight Result

Report file: reports/phase10d-raspberry-pi-5/nonaym-hardware-report-20260522-131117.txt reports/nonaym-hardware-report-YYYYMMDD-HHMMSS.txt

Detected architecture: ARM64 / aarch64 
CPU cores: 4 
Memory: 7GB 
Raspberry Pi detected: yes Expected yes 
Recommended profile: Raspberry Pi / ARM64 Profile Expected Raspberry Pi / ARM64 Profile 
Reason: Raspberry Pi ARM64 detected with sufficient memory 

## Issues

- lshw not available on Raspberry Pi test environment; not blocking

## Decision

Pending

## Next Action

- Move to Phase 10E — Protectli 2420 Preflight Test Boot Raspberry Pi 5
- Copy or access Nonaym preflight script
- Run read-only preflight
- Save report output
- Update this note
