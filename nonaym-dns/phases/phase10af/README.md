# Nonaym DIY Phase 10AF — Strengthened Raspberry Pi Install-Test Checklist

Status: Planning only

Purpose:
Strengthen the Raspberry Pi / UnifiPi future install-test checklist based on Phase 10AE Q/Danno review feedback.

This phase does not install Nonaym DIY.
This phase does not write an image.
This phase does not partition disks.
This phase does not format disks.
This phase does not modify DNS, network settings, packages, disks, or services.

## Review basis

Phase 10AE review result:

- Q: CAUTION / needs refinement before any write-capable phase
- Danno: APPROVE for planning, with required refinements before actual write behavior

Required refinements from review:

- Exact target storage device identification
- Concrete recovery/reflash procedure
- Concrete network isolation method
- Rollback/failure plan
- Dry-run/no-op verification
- MAC/IP binding confirmation
- Explicit final human approval phrase

## Target

- Machine name/hostname: UnifiPi
- Login user: mslepikas
- LAN IP: 10.1.1.102
- Hardware class: Raspberry Pi / ARM
- Current role: future overwrite/install-capable test target

## Production no-write target

The following remains protected production:

- Protectli 2420
- Host/role: ns2 quantaa
- LAN IP: 10.1.1.109
- Rule: no write, no script copy, no /tmp report, no reboot, no DNS/network/service changes, no install testing

## Non-negotiable future pre-write gates

Before any future write command is allowed, all of the following must be satisfied.

### 1. Target identity gate

Must confirm:

- Hostname is UnifiPi.
- LAN IP is 10.1.1.102.
- SSH user is mslepikas.
- Architecture is aarch64.
- MAC address matches the expected approved Raspberry Pi interface.
- The target is not Protectli / ns2 quantaa.
- The target is not GB10/omnieon.

The MAC address must be captured internally for wrong-target prevention, but redacted from public docs.

### 2. Target storage gate

Must identify the exact target storage device before writing.

For the current UnifiPi inventory, the observed storage was:

- Device: nvme0n1
- Size: 238.5G
- Model: SANZANG
- Current root: nvme0n1p2 mounted at /

Before any write:
- Confirm the target storage device again.
- Confirm the target storage can be erased.
- Confirm no other disk is selected.
- Confirm no production or customer data is needed.

### 3. Recovery/reflash gate

Must document a real recovery path before writing.

Minimum recovery requirements:
- Known-good Raspberry Pi boot media or installer image available.
- Ability to reflash the Pi storage if the write fails.
- Access to physical device or remote-console equivalent.
- Network access recovery plan if the Pi does not come back online.
- Known location of any image/artifact used for restore.
- Human operator understands that the device may become temporarily unbootable.

### 4. Network isolation gate

Before writing, define the network boundary.

Acceptable future options:
- Dedicated isolated switch or port.
- Temporary isolated VLAN.
- Direct-connected management network.
- Main LAN allowed only if Danno approves the risk and no production services depend on the target.

Minimum requirement:
- Confirm Protectli / ns2 quantaa is not involved.
- Confirm no DNS role or production service depends on UnifiPi during the test.
- Confirm the target can be safely offline.

### 5. Rollback/failure gate

Must define what happens if writing fails.

Rollback plan must include:
- How to stop the test safely.
- How to reflash or restore boot media.
- How to verify the Pi boots again.
- How to verify it does not disrupt production network services.
- How to record failure without trying risky live fixes.

### 6. Dry-run/no-op gate

Before any write phase:
- Preview the exact future command.
- Show the exact image/source artifact.
- Show the exact target device.
- Run any available no-op/dry-run command.
- If no true dry-run exists, use a manual verification checklist and stop before the write.

### 7. Human approval gate

Before any future write command, require an exact approval phrase.

Proposed approval phrase:

I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY

No write command may run without the human operator entering the exact phrase during that future phase.

## Future Phase 10AG candidate

Phase 10AG should be a Q/Danno review of this strengthened checklist.

If approved, a later phase may prepare a write-command preview, but still should stop before execution unless the final approval phrase is provided.

## Phase 10AF success criteria

Phase 10AF passes when:

- Target identity gate is documented.
- Target storage gate is documented.
- Recovery/reflash gate is documented.
- Network isolation gate is documented.
- Rollback/failure gate is documented.
- Dry-run/no-op gate is documented.
- Human approval phrase is documented.
- No install behavior is added.
- No machine is modified.
