# Nonaym DIY Phase 10CB — SSH Authentication Recovery Plan

Status: Diagnosis only / no write

Purpose:
Safely diagnose why SSH authentication to UnifiPi failed after the stopped Phase 10CA execution attempt.

This phase does not execute the write script.
This phase does not chmod the script executable.
This phase does not write an image.
This phase does not flash, partition, format, mount, install packages, change DNS/services, or reboot.

## Current state

- Phase 10CA execution attempt stopped before confirmed write.
- SSH authentication failed at the write step.
- A later read-only SSH check also failed with publickey/password denial.
- Final script was returned to non-executable mode.
- No confirmed image write occurred.

## Safety rule

Do not retry the image write until SSH access is understood and restored.

## Diagnosis goals

- Confirm whether UnifiPi is still online.
- Confirm whether SSH port is reachable.
- Confirm whether password/auth is failing versus network failure.
- Avoid lockout loops.
- Avoid reboot or service changes.
- Avoid any write-capable action.

## Still forbidden

- No script execution.
- No chmod +x.
- No image writing.
- No disk writes.
- No reboot.
- No service changes.
- No DNS/network changes.
- No action against Protectli / ns2 quantaa.
