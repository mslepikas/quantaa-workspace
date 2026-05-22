# Nonaym DIY Machine Test — Generic Intel / nonaym1

Date: 2026-05-22

## Machine

Manufacturer: Generic Intel
Model: nonaym1
CPU: x86_64, 4 cores detected
RAM: 7GB detected
Storage: Detected by preflight report
Ethernet: Available / existing network access at 192.168.1.211
Wi-Fi: Unknown / not required
Boot mode: Existing OS boot path
Secure Boot: Not blocking in Phase 10F

## Flash Drive

Image/version: Nonaym Phase 10 preflight package from nonaym.ai
Flash drive: Not used directly; package downloaded from nonaym.ai
Flashing tool: Not applicable for this preflight run
Checksum verified: yes

## Boot Result

Boot success: yes
Boot notes: Existing OS booted and downloaded package successfully
BIOS/UEFI changes: none
Internal disk touched: no

## Preflight Result

Report file: reports/phase10f-generic-intel-nonaym1/nonaym-hardware-report-20260522-124433.txt

Detected architecture: x86_64
CPU cores: 4
Memory: 7GB
Raspberry Pi detected: no
Recommended profile: Standard x86_64 Profile
Reason: x86_64 architecture with sufficient resources

## Issues

- Initial run exposed same architecture-detection bug in preflight package; passed after local architecture fix
- lshw and dmidecode not available; not blocking for Phase 10F

## Decision

PASS

## Next Action

- Phase 10F complete
- Public preflight package refreshed with architecture fix
- Move to Lenovo testing after 10E/10F documentation commit
