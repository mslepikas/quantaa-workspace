# Nonaym DIY Phase 10CF — Controlled Reboot and First Boot Verification

Status: Post-write reboot / first boot verification

Purpose:
Reboot UnifiPi after the successful Phase 10CE image write and verify whether the freshly written Raspberry Pi OS Lite image boots.

## Prior result

Phase 10CE successfully wrote the Raspberry Pi OS Lite 64-bit image to:

- Target host before reboot: UnifiPi
- Target IP before reboot: 10.1.1.102
- Target device: /dev/nvme0n1
- Write result: 3229614080 bytes copied
- Remote sync completed
- No reboot was performed in Phase 10CE

## Important operator note

During the Phase 10CE approval/write workflow, entering the exact approval phrase appeared to contribute to hidden Caps Lock/password confusion during SSH/sudo prompts.

Future execution scripts and procedures should account for this by:
- warning the operator to check Caps Lock before password or approval prompts
- preferring SSH key authentication where practical
- avoiding repeated password prompts where possible
- keeping approval phrase entry separate from password troubleshooting

## Phase 10CF allowed actions

- Reboot UnifiPi.
- Wait for first boot.
- Ping UnifiPi.
- Attempt SSH login.
- Verify hostname, architecture, OS release, storage, and network.
- Document result.

## Still forbidden

- No image writing.
- No flashing.
- No partitioning.
- No formatting.
- No mounting image files.
- No package installs.
- No DNS changes.
- No service changes.
- No action against Protectli / ns2 quantaa / 10.1.1.109.

## Expected first-boot possibilities

The new Raspberry Pi OS image may not boot with the same SSH credentials or network settings.

Possible outcomes:
- Boots and SSH works.
- Boots but hostname/user/IP changes.
- Boots but SSH is not enabled.
- Boots but gets a different DHCP IP.
- Does not boot and needs physical console/reflash troubleshooting.

## Success criteria

Phase 10CF passes when:
- UnifiPi reboots after the image write.
- First boot status is documented.
- Network reachability is documented.
- SSH/login status is documented.
- Storage/OS state is documented if reachable.
