# Phase 10I — Nonaym DIY Minimum Requirements Draft

Date: 2026-05-22

## Purpose

Compare Phase 10D through Phase 10H preflight results and define the first draft of Nonaym DIY minimum and recommended hardware requirements.

This is a documentation phase only.

No installer image build.
No disk changes.
No Docker changes.
No Technitium install.
No website change.

## Tested Devices

| Phase | Device | Hostname | Result | Recommended Profile |
|------|--------|----------|--------|---------------------|
| 10D | Raspberry Pi 5 | UnifiPi | PASS | Raspberry Pi / ARM64 Profile |
| 10E | Protectli 2420 | ns2quantaa | PASS after architecture fix | Standard x86_64 Profile |
| 10F | Generic Intel machine | nonaym1 | PASS after architecture fix | Standard x86_64 Profile |
| 10G | Lenovo #1 | nonaym5 | PASS | Standard x86_64 Profile |
| 10H | Lenovo #2 | nonaym4 | PASS | Standard x86_64 Profile |

## Observed Results

### Raspberry Pi 5 / UnifiPi

Observed:

- CPU cores: 4
- Memory: 7GB
- Raspberry Pi detected: yes
- Recommended profile: Raspberry Pi / ARM64 Profile
- Result: PASS

Notes:

- Raspberry Pi path works for ARM64 detection.
- Raspberry Pi should remain a separate profile from x86_64.
- Raspberry Pi testing does not prove the x86_64 DIY image path.

### Protectli 2420 / ns2quantaa

Observed:

- CPU cores: 4
- Memory: 14GB
- Raspberry Pi detected: no
- Recommended profile: Standard x86_64 Profile
- Result: PASS after architecture fix

Notes:

- Good appliance-style candidate.
- Strong fit for future Nonaym Lite style testing.
- Architecture detection bug was discovered during this test.

### Generic Intel / nonaym1

Observed:

- CPU cores: 4
- Memory: 7GB
- Raspberry Pi detected: no
- Recommended profile: Standard x86_64 Profile
- Result: PASS after architecture fix

Notes:

- Good representative repurposed customer Intel machine.
- Architecture detection bug repeated before package refresh.
- Passed after local patch.

### Lenovo #1 / nonaym5

Observed:

- CPU cores: 4
- Memory: 7GB
- Raspberry Pi detected: no
- Recommended profile: Standard x86_64 Profile
- Result: PASS

Notes:

- Refreshed package worked correctly.
- Good common-customer-hardware result.

### Lenovo #2 / nonaym4

Observed:

- CPU cores: 4
- Memory: 7GB
- Raspberry Pi detected: no
- Recommended profile: Standard x86_64 Profile
- Result: PASS

Additional observed system information:

- Ubuntu 26.04 LTS
- Kernel 7.0.0-15-generic
- Root filesystem approximately 97.87GB
- Temperature 39.0 C during login
- Existing network access at 192.168.1.212

Notes:

- Refreshed package worked correctly.
- Good repeatability result against Lenovo #1.

## Key Lessons

### 1. Architecture detection must stay simple

The initial preflight script incorrectly combined logging output with the detected architecture value.

Bad result:

Unsupported architecture (Architecture: x86_64 x86_64)

Corrected behavior:

detect_architecture() returns only:

x86_64

Decision:

Keep architecture detection clean and machine-readable.

### 2. Raspberry Pi must remain a separate path

Raspberry Pi 5 passed as ARM64, but ARM64 alone must not automatically mean Raspberry Pi.

Decision:

Use explicit Raspberry Pi detection before recommending the Raspberry Pi profile.

### 3. x86_64 machines with 4 cores and 7GB+ RAM look strong

Protectli, generic Intel, and both Lenovo machines all passed as Standard x86_64 after the architecture fix.

Decision:

4 CPU cores and approximately 8GB RAM class hardware should be treated as recommended, not merely minimum.

### 4. Missing lshw/dmidecode is not blocking

Some machines lacked lshw or dmidecode.

Decision:

These tools are useful but should not be required for preflight PASS.

### 5. Download/checksum flow works

The public preflight package download and SHA256 verification worked across Raspberry Pi and x86_64 machines.

Decision:

Keep checksum verification in the future customer-facing flow.

## Draft Hardware Requirements

### Nonaym DIY Standard x86_64 — Recommended

Recommended for:

- Repurposed desktops
- Repurposed mini PCs
- Lenovo/ThinkCentre-style machines
- Protectli-style appliance boxes
- Generic Intel/AMD machines

Recommended hardware:

- 64-bit Intel/AMD CPU
- 4 CPU cores preferred
- 8GB RAM class preferred
- 64GB+ storage preferred
- Ethernet strongly preferred
- USB boot support
- Debian-compatible or Ubuntu-compatible hardware
- Stable power supply
- Reliable SSD preferred over old HDD

Observed passing examples:

- Protectli / ns2quantaa: 4 cores, 14GB RAM
- Generic Intel / nonaym1: 4 cores, 7GB RAM
- Lenovo #1 / nonaym5: 4 cores, 7GB RAM
- Lenovo #2 / nonaym4: 4 cores, 7GB RAM

### Nonaym DIY Standard x86_64 — Minimum Draft

Minimum candidate:

- 64-bit Intel/AMD CPU
- 2 CPU cores minimum
- 4GB RAM minimum
- 32GB storage minimum
- Ethernet strongly preferred
- USB boot support

Caution:

This minimum is a draft. It has not yet been tested on a 2-core or 4GB RAM machine during Phase 10D–10H.

### Nonaym DIY Lightweight x86_64 — Future Candidate

Possible lightweight target:

- 64-bit Intel/AMD CPU
- 2 CPU cores
- 2GB RAM minimum
- 16GB storage minimum
- Ethernet required or strongly preferred

Decision:

Do not publicly promise this yet. More testing is needed before claiming support for 2GB RAM systems.

### Nonaym DIY Raspberry Pi ARM64 — Recommended

Recommended hardware:

- Raspberry Pi 5 preferred
- Raspberry Pi 4/5 candidate path
- 4GB RAM or more preferred
- Reliable USB SSD or high-quality storage preferred
- Ethernet preferred
- ARM64 OS required

Observed passing example:

- Raspberry Pi 5 / UnifiPi: 4 cores, 7GB RAM

### Nonaym DIY Raspberry Pi ARM64 — Minimum Draft

Minimum candidate:

- Raspberry Pi 4 or newer
- ARM64 OS
- 2GB RAM minimum
- 16GB storage minimum
- Ethernet strongly preferred

Caution:

The only tested Raspberry Pi in this phase was Raspberry Pi 5 with 7GB RAM. Raspberry Pi 4 and 2GB models require future testing before public support claims.

## Public Customer Guidance Draft

Recommended customer wording:

Nonaym DIY is intended for common repurposed 64-bit computers and Raspberry Pi-class devices.

Best results are expected with:

- 64-bit Intel/AMD computer
- 4 CPU cores
- 8GB RAM class hardware
- 64GB or larger SSD
- Ethernet connection
- USB boot support

Raspberry Pi support should be listed separately:

- Raspberry Pi 5 preferred
- ARM64 Raspberry Pi OS required
- Ethernet recommended
- Reliable storage recommended

Avoid promising:

- every old computer will work
- Wi-Fi-only installs are ideal
- 2GB systems are fully supported
- Raspberry Pi 3 or older is supported
- old failing hard drives are suitable
- production install without backup

## Installer Script Improvements Needed

Before building a real DIY installer image, improve the preflight script to include:

1. Storage size scoring
2. Ethernet adapter count
3. Wi-Fi-only caution
4. OS name/version output in recommendation section
5. Architecture detection unit test
6. Explicit Protectli/appliance profile if hardware matches
7. Better report summary table
8. Optional JSON output for future web/dashboard use
9. Clear PASS / CAUTION / FAIL result
10. Version field inside the script and report

## Draft PASS / CAUTION / FAIL Rules

### PASS

Use when:

- supported architecture
- enough CPU
- enough memory
- enough storage
- usable network
- no blocking boot issue

### CAUTION

Use when:

- Wi-Fi-only
- low RAM
- small storage
- missing optional inventory tools
- older CPU
- Secure Boot or BIOS complications
- unknown storage health

### FAIL

Use when:

- unsupported architecture
- less than minimum RAM
- less than minimum storage
- no usable network
- cannot boot test environment
- disk appears unreliable
- user cannot dedicate the machine safely

## Proposed Official Draft Requirements

### Recommended DIY x86_64

- 64-bit Intel/AMD
- 4 cores
- 8GB RAM class
- 64GB SSD
- Ethernet
- USB boot

### Minimum DIY x86_64

- 64-bit Intel/AMD
- 2 cores
- 4GB RAM
- 32GB storage
- Ethernet strongly preferred

### Recommended Raspberry Pi

- Raspberry Pi 5
- ARM64 OS
- 4GB RAM or more
- Reliable USB SSD or high-quality storage
- Ethernet

### Minimum Raspberry Pi Candidate

- Raspberry Pi 4 or newer
- ARM64 OS
- 2GB RAM
- 16GB storage
- Ethernet strongly preferred

## Phase 10I Decision

Phase 10I result:

PASS

The first hardware compatibility round supports moving forward with Nonaym DIY planning using:

- Standard x86_64 as the primary DIY path
- Raspberry Pi ARM64 as a separate supported test path
- Lightweight x86_64 as a future/experimental candidate

## Recommended Next Phase

Phase 10J — Improve Preflight Script v2

Purpose:

Add clearer PASS / CAUTION / FAIL output, storage checks, Ethernet/Wi-Fi checks, script versioning, and better report summaries before creating a real installer image.
