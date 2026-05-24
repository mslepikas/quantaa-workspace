# Nonaym DIY Phase 10BY — Final Execution Readiness Checkpoint

Status: Final pause point / no execution

Purpose:
Create a final checkpoint before any actual Raspberry Pi / UnifiPi image-write execution phase.

This phase confirms the reviewed script, artifact, target, safety gates, and still-forbidden actions.

This phase does not execute the script.
This phase does not chmod the script executable.
This phase does not write an image.
This phase does not flash USB, SD, or NVMe.
This phase does not partition disks.
This phase does not format disks.
This phase does not mount the image.
This phase does not install Nonaym DIY.
This phase does not modify DNS, network settings, packages, disks, or services.
This phase does not reboot any machine.

## Current state

The Phase 10BU final execution script has been created and hardened.

Script:

- nonaym-dns/phases/phase10bu/PHASE10BU-FINAL-EXECUTION-SCRIPT.sh

The script remains non-executable.

The Phase 10BX review gate passed:

- Q: PASS
- Danno: APPROVE

## Verified local artifact

- Image path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- Checksum path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256
- Provenance path: nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.PROVENANCE.md
- Image type: Raspberry Pi OS Lite 64-bit
- Phase 10BC checksum result: PASS

## Intended execution target

- Hostname: UnifiPi
- SSH user: mslepikas
- LAN IP: 10.1.1.102
- Architecture: aarch64
- Target device: /dev/nvme0n1
- Storage model: SANZANG
- Storage size: 238.5G

## Protected production target

The following remains no-write production:

- Protectli 2420 / ns2 quantaa / 10.1.1.109

Hard rules:
- no write
- no script copy
- no reboot
- no DNS/network/service changes
- no install testing
- no use as a target
- hardcoded rejection is present in the final script

## Still forbidden in Phase 10BY

- No script execution.
- No chmod +x.
- No image writing.
- No image flashing.
- No disk partitioning.
- No formatting.
- No image mounting.
- No package installs.
- No DNS changes.
- No service changes.
- No network reconfiguration.
- No reboot.
- No write action against Raspberry Pi / UnifiPi.
- No write action against Protectli / ns2 quantaa.
- No action against any production target.

## Required before any execution phase

Before moving to an actual execution phase:

1. Confirm physical access to UnifiPi.
2. Confirm UnifiPi can be overwritten.
3. Confirm UnifiPi can safely go offline.
4. Confirm recovery/reflash path is ready.
5. Confirm no production service depends on UnifiPi.
6. Confirm no customer/public service depends on UnifiPi.
7. Confirm latest Git state is clean.
8. Confirm final script is the reviewed script.
9. Confirm final script remains non-executable until execution phase.
10. Confirm Q/Danno approval is documented.
11. Confirm human operator wants to proceed to execution.
12. Require exact approval phrase inside script during execution.

## Final approval phrase

The exact phrase required inside the script is:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

## Recommended human pause

This is a good checkpoint to pause before destructive work.

Do not proceed to execution if:
- you are tired
- you are uncertain
- UnifiPi physical access is not available
- recovery path is not ready
- any production dependency is suspected
- any target identity detail feels wrong

## Future Phase 10BZ candidate

Phase 10BZ should be the actual execution approval checkpoint.

Phase 10BZ should not execute automatically.

It should:
- restate the destructive nature of the write
- confirm final human readiness
- confirm recovery access
- make the script executable only inside the approved execution phase
- run the script only after the exact approval phrase is entered

## Phase 10BY success criteria

Phase 10BY passes when:

- Final readiness checkpoint is documented.
- Script/artifact/target/protected-target state is documented.
- Still-forbidden actions are documented.
- Required execution prerequisites are documented.
- No script execution occurs.
- No image writing occurs.
- No target machine is modified.
