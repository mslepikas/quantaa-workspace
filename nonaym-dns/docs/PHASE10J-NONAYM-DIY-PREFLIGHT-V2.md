# Phase 10J — Nonaym DIY Preflight Script v2.1

Date: 2026-05-22

## Purpose

Improve the Nonaym DIY preflight script before building a real installer image.

Phase 10J adds a clearer final result section:

- PASS
- CAUTION
- FAIL

This phase remains read-only.

## Safety

The script does not:

- install packages
- install Docker
- start Technitium
- stop Technitium
- format disks
- change partitions
- change DNS
- change network settings
- change firewall rules

## Script

Path:

scripts/nonaym-diy-preflight.sh

Version:

phase10j-v2.1

## Improvements

Added:

- script version field
- OS detection
- boot mode detection
- total disk capacity check
- root filesystem free-space check
- Ethernet adapter count
- Wi-Fi adapter count
- warning list
- final Nonaym DIY result section
- clear PASS / CAUTION / FAIL result
- clearer next-step guidance
- standalone report path fix

## Important Testing Rule

The GB10 / omnieon production machine must not be used as a Nonaym DIY test target.

Allowed on GB10:

- editing files
- staging files
- git status/diff/commit
- static syntax checks

Not allowed on GB10:

- running Nonaym DIY preflight as a test target unless explicitly approved

## Regression Test

Test target:

- Hostname: nonaym4
- IP: 192.168.1.212
- OS: Ubuntu 26.04 LTS
- Architecture: x86_64

Report:

reports/phase10j-v2-1-nonaym4-patched/nonaym-hardware-report-20260522-200434.txt

Result:

PASS

Observed final result:

- Script version: phase10j-v2.1
- Architecture: x86_64
- CPU cores: 4
- Memory: 7GB
- Detected total disk capacity: 238GB
- Root filesystem free: 80GB
- Ethernet adapters detected: 1
- Wi-Fi adapters detected: 0
- Recommended Profile: Standard x86_64 Profile
- NONAYM DIY RESULT: PASS
- Warnings: none

## Decision

Phase 10J v2.1 passed first regression testing on nonaym4.

Do not refresh the public nonaym.ai download package until Phase 10K or later.

## Recommended Next Phase

Phase 10K — Test Preflight v2.1 on one additional known device or prepare a controlled package refresh.

Recommended next target:

- nonaym5, or
- nonaym1, or
- Raspberry Pi if validating ARM64 v2.1 behavior
