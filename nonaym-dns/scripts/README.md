# Nonaym DIY Hardware Preflight Script

This script is used to inventory hardware and recommend installation profiles for Nonaym DIY projects.

## Usage

```bash
./scripts/nonaym-diy-preflight.sh
```

## Output

- Generates a timestamped report file in the `reports/` directory
- Example: `reports/nonaym-hardware-report-20260522-093651.txt`
- Contains hardware information and installation profile recommendation

## Safety

This is a read-only script that:
- Does NOT install packages
- Does NOT install Docker
- Does NOT start/stop Technitium
- Does NOT format disks or change partitions
- Does NOT modify network settings or DNS
- Does NOT change firewall rules or systemd-resolved
- Does NOT write outside the project reports directory

## Supported Test Machines

1. Raspberry Pi
2. Protectli 2420
3. Generic Intel machine
4. Lenovo computer #1
5. Lenovo computer #2

## Installation Profiles Recommended

- Raspberry Pi / ARM64 Profile
- Standard x86_64 Profile
- Lightweight x86_64 Profile
- ARM Caution / Not Recommended
- x86_64 Caution / Not Recommended
- Unsupported Architecture