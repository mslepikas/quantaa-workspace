# Nonaym DIY Phase 10BZ — Final Execution Approval Checkpoint

Status: Final approval checkpoint / no automatic execution

Purpose:
Create the final human approval checkpoint before running the Phase 10BU final execution script that will overwrite UnifiPi.

This phase is the last checkpoint before destructive work.

This checkpoint does not automatically execute the script.
This checkpoint does not automatically chmod the script executable.
This checkpoint does not automatically write an image.
This checkpoint does not reboot any machine.

## Destructive action warning

The next execution step will overwrite:

- Target host: UnifiPi
- Target IP: 10.1.1.102
- Target storage: /dev/nvme0n1

This will destroy the current contents of the target storage.

## Protected production target

The following remains no-write production and must not be touched:

- Protectli 2420 / ns2 quantaa / 10.1.1.109

The final script includes a hardcoded rejection for 10.1.1.109.

## Final script

Reviewed final script:

- nonaym-dns/phases/phase10bu/PHASE10BU-FINAL-EXECUTION-SCRIPT.sh

The script was reviewed in Phase 10BX:

- Q: PASS
- Danno: APPROVE

## Required final readiness confirmations

Before execution, confirm:

- Physical access to UnifiPi is available.
- UnifiPi can be overwritten.
- UnifiPi can safely go offline.
- Recovery/reflash path is ready.
- No production service depends on UnifiPi.
- No customer/public service depends on UnifiPi.
- The script is the reviewed Phase 10BU script.
- The script still contains the hardcoded 10.1.1.109 rejection.
- The local Raspberry Pi OS Lite artifact checksum still passes.
- You are ready for UnifiPi to become temporarily unbootable.

## Final approval phrase

The script will require this exact phrase before write:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

## Phase 10BZ result options

If not ready:
- Stop here.
- Do not chmod the script.
- Do not run the script.

If ready:
- Move to the separate execution command after this checkpoint.
- The execution command must be run manually.
- The script will still require the exact approval phrase before writing.
