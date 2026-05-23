# Phase 10S — Q/Danno Review Packet

Status: Draft for review

Purpose:
Prepare a reviewed, documentation-only minimum hardware requirements draft for Nonaym DIY.

This packet must be reviewed before adding new scripts, testing additional machines, or making customer-facing claims.

## Current completed work

### Phase 10P

Created dry-run installer skeleton only.

Result:
- No install-capable behavior.
- No disk writes.
- No package installs.
- No service changes.
- No DNS/network changes.

### Phase 10Q

Created read-only hardware inventory script.

Result:
- Script refused to run on GB10/omnieon.
- Script is intended for external test machines only.
- No install behavior added.

### Phase 10R

Ran first external inventory test on nonaym4.

Result:
- nonaym4 inventory completed.
- GB10/omnieon was not used as test target.
- No install behavior occurred.

## Known nonaym4 result

- Machine name: nonaym4
- Machine type: Lenovo test machine
- Architecture: x86_64
- CPU: Intel Core i3-6100 CPU @ 3.70GHz
- CPU count shown: 4
- RAM: 7.1 GiB
- Swap: 4.0 GiB
- Boot mode: Legacy BIOS or unknown
- Storage: 238.5G Samsung NVMe
- Root filesystem: Ubuntu LVM, 100G mounted at /
- Primary network interface present: wired Ethernet

Privacy note:
Raw output included local network details and a MAC address. These must not be published publicly without review/redaction.

## Available next test machines

- generic Intel / nonaym1
- nonaym5, believed similar to nonaym4
- Protectli 2420 / ns2quantaa
- Raspberry Pi 5

Recommended next comparison:
generic Intel / nonaym1, because it gives a better comparison than immediately testing nonaym5 if nonaym5 is likely similar to nonaym4.

## Draft minimum hardware direction

Early draft only, not final:

- Architecture: x86_64 preferred for first DIY release
- CPU: Intel Core 6th Gen or similar/better
- RAM: 4GB minimum, 8GB recommended
- Storage: 64GB minimum, 128GB+ recommended
- Storage type: SSD/NVMe preferred
- Network: wired Ethernet strongly recommended
- Boot: UEFI preferred, Legacy BIOS needs more testing
- Wi-Fi-only devices: not first baseline; needs review
- ARM/Raspberry Pi: later comparison, not first customer baseline

## Q review request

Q should review for:

- Technical completeness
- Hardware requirement logic
- Whether nonaym4 is a reasonable first baseline
- Whether generic Intel / nonaym1 is the correct next comparison target
- Whether any technical assumptions are unsupported
- Whether Phase 10S should add documentation only or also a read-only comparison template

Q must not recommend install behavior yet.

## Danno review request

Danno should review for:

- No install-capable behavior
- No disk-writing behavior
- No service modification behavior
- No DNS/network modification behavior
- GB10/omnieon exclusion remains intact
- Sensitive hardware/network identifiers are not exposed publicly
- Customer-facing claims are not premature
- The next machine test remains read-only and controlled

Danno must return one of:

- APPROVE
- CAUTION
- STOP

## Human approval gate

No Phase 10S customer-facing requirements should be finalized until:

- Q review is complete.
- Danno review is complete.
- Human operator approves the next step.
