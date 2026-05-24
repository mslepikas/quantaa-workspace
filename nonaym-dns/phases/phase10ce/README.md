# Nonaym DIY Phase 10CE — Controlled Execution Retry Checkpoint

Status: Controlled retry checkpoint

Purpose:
Retry the reviewed Phase 10BU final execution script after Phase 10CD restored SSH key access to UnifiPi.

This phase is allowed to proceed to execution only after:
- checksum passes
- SSH key login works
- live UnifiPi identity is confirmed
- live storage is confirmed
- script is made executable only for this controlled retry
- human enters the exact approval phrase inside the script

## Current recovery state

- Phase 10CA: previous execution attempt stopped before confirmed write due to SSH authentication failure.
- Phase 10CB: network and SSH port were reachable; authentication failed.
- Phase 10CC: corrected mistaken diagnosis that had run on omnieon instead of UnifiPi.
- Phase 10CD: SSH key access was restored using ssh-copy-id.
- Key SSH test passed from omnieon to UnifiPi.

## Target

- Hostname: UnifiPi
- IP: 10.1.1.102
- Architecture: aarch64
- Target storage: /dev/nvme0n1
- Storage model: SANZANG

## Protected target

- Protectli 2420 / ns2 quantaa / 10.1.1.109
- Must not be touched.
- Final script contains hardcoded 10.1.1.109 rejection.

## Final script

- nonaym-dns/phases/phase10bu/PHASE10BU-FINAL-EXECUTION-SCRIPT.sh

## Required approval phrase

The script will require:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

## Safety notes

- No reboot is included in the script.
- If any preflight check fails, stop.
- If SSH prompts unexpectedly or fails again, stop.
- Do not retry repeatedly.
