# Phase 10K — Nonaym DIY Public Preflight Package Refresh

Date: 2026-05-22

## Purpose

Refresh the public Nonaym DIY preflight package on nonaym.ai from the earlier Phase 10D package to the Phase 10J v2.1 preflight script.

This remains a read-only hardware preflight package.

It is not a Nonaym installer image.

## Safety

The public Phase 10K package does not:

- install packages
- install Docker
- start Technitium
- stop Technitium
- format disks
- change partitions
- change DNS
- change network settings
- change firewall rules

## Website Deployment

Production website repo:

/home/mslepikas/.openclaw/workspace/websites/nonaym-website-production

GitHub repo:

mslepikas/nonaym-website

Branch:

main

Website commit:

41639f7 refresh nonaym diy preflight package v2

Live package:

https://nonaym.ai/download/files/nonaym-diy-preflight-phase10k.tar.gz

Live checksum:

https://nonaym.ai/download/files/nonaym-diy-preflight-phase10k.tar.gz.sha256

Live SHA256:

5a9344398bc4b43646e573cc249f23f680876aa7a9c245df12b26871858756c8

## Public Package Verification

The live package checksum was visible from nonaym.ai.

The live download page referenced:

- /download/files/nonaym-diy-preflight-phase10k.tar.gz
- /download/files/nonaym-diy-preflight-phase10k.tar.gz.sha256

## Test Target

The public package was tested from a non-GB10 device.

Target:

- Hostname: nonaym4
- IP: 192.168.1.212
- OS: Ubuntu 26.04 LTS
- Architecture: x86_64

GB10 / omnieon was not used as the test target.

## Public Package Test Result

Report:

reports/phase10k-public-package-nonaym4/nonaym-hardware-report-20260522-201508.txt

Observed result:

- Script version: phase10j-v2.1
- Architecture: x86_64
- CPU cores: 4
- Memory: 7GB
- Detected total disk capacity: 238GB
- Root filesystem free: 80GB
- Ethernet adapters detected: 1
- Wi-Fi adapters detected: 0
- Raspberry Pi detected: no
- Recommended Profile: Standard x86_64 Profile
- NONAYM DIY RESULT: PASS
- Warnings: none

## Decision

Phase 10K result:

PASS

The public nonaym.ai Phase 10K preflight package downloaded successfully, passed SHA256 verification, extracted successfully, ran successfully on nonaym4, saved its report to the standalone package reports folder, and returned PASS.

## Next Phase

Recommended next phase:

Phase 10L — Public Package ARM64 Regression or Installer Planning Gate

Options:

1. Test the public Phase 10K package on Raspberry Pi to validate ARM64 behavior.
2. Create an installer-planning gate before any real install image is built.
3. Begin designing the future installer flow, but keep install actions disabled until reviewed.
