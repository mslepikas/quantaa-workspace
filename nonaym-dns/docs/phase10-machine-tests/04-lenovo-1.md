# Nonaym DIY Machine Test — Lenovo #1 / nonaym5

Date: 2026-05-22

## Machine

Manufacturer: Lenovo
Model: nonaym5
CPU: x86_64, 4 cores detected
RAM: 7GB detected
Storage: Detected by preflight report
Ethernet: Available / existing network access at 192.168.1.217
Wi-Fi: Unknown / not required for this preflight
Boot mode: Existing OS boot path
Secure Boot: Not blocking in Phase 10G

## Flash Drive

Image/version: Refreshed Nonaym Phase 10 preflight package from nonaym.ai
Flash drive: Not used directly; package downloaded from nonaym.ai
Flashing tool: Not applicable for this preflight run
Checksum verified: yes

## Boot Result

Boot success: yes
Boot notes: Existing OS booted and downloaded package successfully
BIOS/UEFI changes: none
Internal disk touched: no

## Preflight Result

Report file: reports/phase10g-lenovo-1-nonaym5/nonaym-hardware-report-20260522-130139.txt

Detected architecture: x86_64
CPU cores: 4
Memory: 7GB
Raspberry Pi detected: no
Recommended profile: Standard x86_64 Profile
Reason: x86_64 architecture with sufficient resources

## Issues

- lshw and dmidecode not available; not blocking for Phase 10G
- Refreshed public package worked correctly; architecture bug did not repeat

## Decision

PASS

## Next Action

- Move to Phase 10H — Lenovo #2 Preflight Test
