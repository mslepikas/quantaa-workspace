# Nonaym DIY Machine Test — Protectli 2420 / ns2quantaa

Date: 2026-05-22

## Machine

Manufacturer: Protectli
Model: Protectli 2420 / ns2quantaa
CPU: x86_64, 4 cores detected
RAM: 14GB detected
Storage: Detected by preflight report
Ethernet: Available, expected appliance-style Ethernet target
Wi-Fi: Unknown / not required
Boot mode: Existing OS boot path
Secure Boot: Not blocking in Phase 10E

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

Report file: reports/phase10e-protectli-2420-ns2quantaa/nonaym-hardware-report-20260522-114053.txt

Detected architecture: x86_64
CPU cores: 4
Memory: 14GB
Raspberry Pi detected: no
Recommended profile: Standard x86_64 Profile
Reason: x86_64 architecture with sufficient resources

## Issues

- Initial run exposed architecture-detection bug in preflight package; passed after local architecture fix

## Decision

PASS

## Next Action

- Phase 10E complete
- Public preflight package refreshed with architecture fix
- Move to Lenovo testing after 10E/10F documentation commit
