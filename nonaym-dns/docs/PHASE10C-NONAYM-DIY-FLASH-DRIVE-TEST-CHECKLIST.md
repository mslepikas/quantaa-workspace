# Phase 10C — Nonaym DIY Flash Drive Test Checklist

## Purpose

Define the one-machine-at-a-time test process for Nonaym DIY.

This phase documents the test order and checklist for writing a Nonaym DIY image to a flash drive, booting one test machine, running the read-only preflight script, saving the hardware report, and deciding whether to proceed.

## Safety Rule

Do not batch test machines.

Test one machine at a time.

Do not move to the next machine until the current machine has:

- boot result documented
- preflight report saved
- hardware profile reviewed
- issues documented
- pass / caution / fail decision recorded

## Test Hardware

Known test machines:

1. Raspberry Pi
2. Protectli 2420
3. Generic Intel machine
4. Lenovo computer #1
5. Lenovo computer #2

## Recommended Test Order

### Test 1 — Raspberry Pi

Purpose:

Validate ARM/Raspberry Pi detection and determine whether the ARM path needs a separate image.

Expected profile:

Raspberry Pi / ARM64 Profile

Important notes:

- Confirm exact Raspberry Pi model
- Confirm RAM size
- Confirm storage type
- Ethernet preferred
- Avoid treating Raspberry Pi result as the same as x86_64 result

### Test 2 — Protectli 2420

Purpose:

Validate appliance-style x86_64 install target.

Expected profile:

Standard x86_64 Profile or future Protectli Appliance Profile

Important notes:

- Confirm NIC detection
- Confirm storage
- Confirm UEFI/BIOS behavior
- Confirm port 53 availability
- Good candidate for Nonaym Lite-style appliance behavior

### Test 3 — Generic Intel Machine

Purpose:

Validate common customer repurposed Intel hardware.

Expected profile:

Standard x86_64 Profile or Lightweight x86_64 Profile

Important notes:

- Confirm CPU generation
- Confirm RAM
- Confirm disk size
- Confirm Ethernet vs Wi-Fi
- Confirm USB boot behavior

### Test 4 — Lenovo Computer #1

Purpose:

Validate common Lenovo customer hardware.

Expected profile:

Standard x86_64 Profile or Lightweight x86_64 Profile

Important notes:

- Watch Secure Boot
- Watch BIOS/UEFI settings
- Watch USB boot options
- Confirm Ethernet or supported Wi-Fi

### Test 5 — Lenovo Computer #2

Purpose:

Validate repeatability across similar customer hardware.

Expected profile:

Standard x86_64 Profile or Lightweight x86_64 Profile

Important notes:

- Compare against Lenovo #1
- Document differences
- Do not assume both Lenovos behave the same

## Standard Test Flow Per Machine

### Step 1 — Identify Machine

Record:

- machine name
- manufacturer
- model
- approximate age
- CPU if known
- RAM if known
- disk size if known
- Ethernet available: yes/no
- Wi-Fi only: yes/no
- notes

### Step 2 — Prepare Flash Drive

Record:

- image name/version
- image source
- date downloaded or built
- flash drive brand/size
- flashing tool used
- checksum verified: yes/no/not available

Do not write over any customer/internal drive.

### Step 3 — Boot Machine

Record:

- boot success: yes/no
- boot mode: UEFI/BIOS
- Secure Boot issue: yes/no
- boot menu key used
- any BIOS changes needed
- whether internal disk was touched: should be no during preflight

### Step 4 — Run Read-Only Preflight

Run:

./scripts/nonaym-diy-preflight.sh

Record report path:

reports/nonaym-hardware-report-YYYYMMDD-HHMMSS.txt

### Step 5 — Review Recommendation

Record:

- detected architecture
- RAM
- CPU cores
- storage
- Ethernet count
- Wi-Fi count
- Raspberry Pi detected: yes/no
- recommended profile
- reason

### Step 6 — Decide Result

Use one of:

PASS

Machine appears suitable for Nonaym DIY testing.

CAUTION

Machine may work, but there are concerns such as limited RAM, storage, Wi-Fi-only network, Secure Boot, or unusual hardware.

FAIL

Machine is not suitable for the current Nonaym DIY test path.

### Step 7 — Save Machine Test Note

Create one note per machine under:

docs/phase10-machine-tests/

Suggested filenames:

- 01-raspberry-pi.md
- 02-protectli-2420.md
- 03-generic-intel.md
- 04-lenovo-1.md
- 05-lenovo-2.md

## Phase 10C Acceptance Criteria

Phase 10C is complete when:

- test order is documented
- standard per-machine test flow is documented
- machine test note template is documented
- safety rule is documented
- no installer/image changes were made

## Next Phase

Phase 10D should be the first actual machine test.

Recommended:

Phase 10D — Raspberry Pi Preflight Test