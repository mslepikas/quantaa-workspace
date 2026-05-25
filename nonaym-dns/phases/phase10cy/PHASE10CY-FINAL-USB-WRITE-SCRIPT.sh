#!/usr/bin/env bash
# Nonaym DIY Phase 10CY — Final USB Write Script
#
# STATUS: DO NOT RUN UNTIL A LATER APPROVED EXECUTION PHASE
#
# This script writes the verified Debian amd64 netinst ISO to the approved USB drive.
# Running it will erase the USB drive.
#
# Required gates before running:
# - Q approval of this exact script
# - Danno approval of this exact script
# - Human approval to execute
# - Exact approval phrase entered inside the script:
#   I APPROVE WRITING THE NONAYM DIY USB INSTALLER TO /DEV/SDA
#
# Approved USB candidate:
# - /dev/sda
# - UDisk
# - usb-General_UDisk-0:0
#
# Blocked system disk:
# - /dev/nvme0n1

set -euo pipefail

WORKSPACE="/home/mslepikas/.openclaw/workspace"
cd "$WORKSPACE" || exit 1

ISO="$WORKSPACE/nonaym-dns/artifacts/debian-amd64-netinst-trixie/debian-13.5.0-amd64-netinst.iso"
SHA="$WORKSPACE/nonaym-dns/artifacts/debian-amd64-netinst-trixie/debian-13.5.0-amd64-netinst.iso.sha256"

TARGET_DEVICE="/dev/sda"
TARGET_PARTITION="/dev/sda1"
TARGET_MODEL="UDisk"
TARGET_BY_ID="/dev/disk/by-id/usb-General_UDisk-0:0"
BLOCKED_SYSTEM_DISK="/dev/nvme0n1"
EXPECTED_HOST="omnieon"

APPROVAL_PHRASE="I APPROVE WRITING THE NONAYM DIY USB INSTALLER TO /DEV/SDA"

echo "=== Phase 10CY USB write preflight: local host guard ==="
LOCAL_HOST="$(hostname)"
echo "LOCAL_HOST=$LOCAL_HOST"
if [ "$LOCAL_HOST" != "$EXPECTED_HOST" ]; then
  echo "STOP: this script must run only on omnieon"
  exit 20
fi

echo
echo "=== Phase 10CY USB write preflight: ISO checksum ==="
(
  cd "$(dirname "$ISO")" || exit 1
  sha256sum -c "$(basename "$SHA")"
)

echo
echo "=== Phase 10CY USB write preflight: target device guard ==="
if [ "$TARGET_DEVICE" != "/dev/sda" ]; then
  echo "STOP: TARGET_DEVICE is not /dev/sda"
  exit 21
fi

if [ "$TARGET_DEVICE" = "$BLOCKED_SYSTEM_DISK" ]; then
  echo "STOP: TARGET_DEVICE matches blocked system disk"
  exit 22
fi

if [ "$TARGET_DEVICE" = "/dev/nvme0n1" ]; then
  echo "STOP: TARGET_DEVICE is hardcoded blocked omnieon system disk"
  exit 23
fi

echo
echo "=== Phase 10CY USB write preflight: root/system disk guard ==="
ROOT_SOURCE="$(findmnt -n -o SOURCE /)"
echo "ROOT_SOURCE=$ROOT_SOURCE"

ROOT_PARENT="$(lsblk -no PKNAME "$ROOT_SOURCE" 2>/dev/null | head -1 || true)"
if [ -n "$ROOT_PARENT" ]; then
  ROOT_PARENT="/dev/$ROOT_PARENT"
fi
echo "ROOT_PARENT=$ROOT_PARENT"

if [ "$TARGET_DEVICE" = "$ROOT_SOURCE" ] || [ "$TARGET_DEVICE" = "$ROOT_PARENT" ]; then
  echo "STOP: TARGET_DEVICE appears to be the root/system disk"
  exit 24
fi

echo
echo "=== Phase 10CY USB write preflight: live USB identity ==="
if [ ! -b "$TARGET_DEVICE" ]; then
  echo "STOP: target device does not exist: $TARGET_DEVICE"
  exit 25
fi

LIVE_TRAN="$(lsblk -dn -o TRAN "$TARGET_DEVICE" | tr -d '[:space:]')"
LIVE_RM="$(lsblk -dn -o RM "$TARGET_DEVICE" | tr -d '[:space:]')"
LIVE_MODEL="$(lsblk -dn -o MODEL "$TARGET_DEVICE" | sed -e 's/^ *//' -e 's/ *$//')"
LIVE_SIZE="$(lsblk -dn -o SIZE "$TARGET_DEVICE" | tr -d '[:space:]')"

echo "TARGET_DEVICE=$TARGET_DEVICE"
echo "LIVE_TRAN=$LIVE_TRAN"
echo "LIVE_RM=$LIVE_RM"
echo "LIVE_MODEL=$LIVE_MODEL"
echo "LIVE_SIZE=$LIVE_SIZE"

if [ "$LIVE_TRAN" != "usb" ]; then
  echo "STOP: target transport is not usb"
  exit 26
fi

if [ "$LIVE_RM" != "1" ]; then
  echo "STOP: target removable flag is not 1"
  exit 27
fi

if [ "$LIVE_MODEL" != "$TARGET_MODEL" ]; then
  echo "CAUTION: target model differs from expected value"
  echo "EXPECTED_MODEL=$TARGET_MODEL"
  echo "LIVE_MODEL=$LIVE_MODEL"
  echo "Continuing because transport/removable/root-disk/by-id checks remain stronger safety gates."
fi

if [ -e "$TARGET_BY_ID" ]; then
  BY_ID_REAL="$(readlink -f "$TARGET_BY_ID")"
  echo "BY_ID_REAL=$BY_ID_REAL"
  if [ "$BY_ID_REAL" != "$TARGET_DEVICE" ]; then
    echo "STOP: USB by-id path exists but does not resolve to target device"
    exit 30
  fi
else
  echo "CAUTION: expected USB by-id path missing: $TARGET_BY_ID"
  echo "Continuing only because live device checks, root-disk guards, sudo, and approval phrase remain active."
fi

echo
echo "=== Phase 10CY USB write preflight: current target mountpoints ==="
lsblk -o NAME,PATH,TYPE,SIZE,MODEL,SERIAL,TRAN,ROTA,RM,HOTPLUG,MOUNTPOINTS "$TARGET_DEVICE"

echo
echo "=== Phase 10CY USB write preflight: unmount target partition if mounted ==="
if findmnt -rn "$TARGET_PARTITION" >/dev/null 2>&1; then
  if ! command -v udisksctl >/dev/null 2>&1; then
    echo "STOP: target partition is mounted but udisksctl is not available for safe unmount"
    exit 31
  fi
  echo "Unmounting $TARGET_PARTITION"
  if ! udisksctl unmount -b "$TARGET_PARTITION"; then
    echo "STOP: udisksctl failed to unmount $TARGET_PARTITION"
    exit 31
  fi
else
  echo "No mounted filesystem found for $TARGET_PARTITION"
fi

echo
echo "=== Phase 10CY USB write preflight: confirm target is unmounted ==="
if findmnt -rn "$TARGET_PARTITION" >/dev/null 2>&1; then
  echo "STOP: target partition is still mounted"
  exit 31
fi

echo
echo "=== Final human approval required ==="
echo "This will ERASE and overwrite USB drive: $TARGET_DEVICE"
echo "Model: $LIVE_MODEL"
echo "Size: $LIVE_SIZE"
echo "Type exactly: $APPROVAL_PHRASE"
read -r APPROVAL

if [ "$APPROVAL" != "$APPROVAL_PHRASE" ]; then
  echo "STOP: approval phrase mismatch"
  exit 32
fi

echo
echo "=== EXECUTION: writing Debian ISO to USB target ==="
sudo dd if="$ISO" of="$TARGET_DEVICE" bs=4M status=progress conv=fsync

echo
echo "=== Sync after write ==="
sync

echo
echo "=== USB write completed. No reboot performed by this script. ==="
