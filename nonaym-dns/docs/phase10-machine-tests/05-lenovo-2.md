# Nonaym DIY Machine Test — Lenovo #2 / nonaym4

Date: 2026-05-22

## Machine

Manufacturer: Lenovo
Model: nonaym4
CPU: x86_64, 4 cores detected
RAM: 7GB detected
Storage: 97.87GB root filesystem observed from login banner
Ethernet: Available / existing network access at 192.168.1.212
Wi-Fi: Unknown / not required for this preflight
Boot mode: Existing Ubuntu 26.04 LTS boot path
Secure Boot: Not blocking in Phase 10H

## Flash Drive

Image/version: Refreshed Nonaym Phase 10 preflight package from nonaym.ai
Flash drive: Not used directly; package downloaded from nonaym.ai
Flashing tool: Not applicable for this preflight run
Checksum verified: yes

## Boot Result

Boot success: yes
Boot notes: Existing Ubuntu 26.04 LTS OS booted and downloaded package successfully
BIOS/UEFI changes: none
Internal disk touched: no

## Preflight Result

Report file: reports/phase10h-lenovo-2-nonaym4/nonaym-hardware-report-20260522-170713.txt

Detected architecture: x86_64
CPU cores: 4
Memory: 7GB
Raspberry Pi detected: no
Recommended profile: Standard x86_64 Profile
Reason: x86_64 architecture with sufficient resources

## Issues

- None blocking
- Refreshed public package worked correctly
- Architecture bug did not repeat

## Decision

PASS

## Next Action

- Phase 10H complete
- Move to Phase 10I — Compare Results and Define Minimum Requirements
