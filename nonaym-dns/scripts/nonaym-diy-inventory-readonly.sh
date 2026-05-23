#!/usr/bin/env bash
set -euo pipefail

HOSTNAME_NOW="$(hostname 2>/dev/null || echo unknown)"

echo "Nonaym DIY Phase 10Q — Read-Only Hardware Inventory"
echo "Mode: READ ONLY"
echo "Host: ${HOSTNAME_NOW}"
echo

if [ "$HOSTNAME_NOW" = "omnieon" ]; then
  echo "STOP: This is GB10/omnieon."
  echo "GB10/omnieon is allowed for editing/staging only."
  echo "It must not be used as a Nonaym DIY hardware inventory or install test target."
  exit 10
fi

echo "SAFETY:"
echo "- This script does not install packages."
echo "- This script does not partition disks."
echo "- This script does not write images."
echo "- This script does not mount or unmount disks."
echo "- This script does not modify DNS."
echo "- This script does not change network settings."
echo "- This script does not start, stop, enable, disable, or restart services."
echo

echo "=== Machine identity ==="
echo "Hostname: ${HOSTNAME_NOW}"
echo "Kernel: $(uname -srmo 2>/dev/null || true)"
echo "Architecture: $(uname -m 2>/dev/null || true)"
echo

echo "=== CPU summary ==="
if command -v lscpu >/dev/null 2>&1; then
  lscpu | grep -E 'Architecture|Model name|CPU\(s\)|Vendor ID|BIOS Model name' || true
else
  echo "lscpu not available"
fi
echo

echo "=== Memory summary ==="
if command -v free >/dev/null 2>&1; then
  free -h
else
  grep -E 'MemTotal|SwapTotal' /proc/meminfo 2>/dev/null || true
fi
echo

echo "=== Boot mode ==="
if [ -d /sys/firmware/efi ]; then
  echo "UEFI"
else
  echo "Legacy BIOS or unknown"
fi
echo

echo "=== Storage devices read-only ==="
if command -v lsblk >/dev/null 2>&1; then
  lsblk -o NAME,TYPE,SIZE,MODEL,TRAN,ROTA,RM,MOUNTPOINTS
else
  echo "lsblk not available"
fi
echo

echo "=== Network interfaces read-only ==="
if command -v ip >/dev/null 2>&1; then
  ip -br link
else
  echo "ip command not available"
fi
echo

echo "=== Compatibility placeholder ==="
echo "Result: REPORT ONLY — no compatibility decision is final in Phase 10Q."
echo "Next review should define minimum CPU/RAM/storage/network requirements before customer-facing use."
