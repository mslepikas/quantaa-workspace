#!/usr/bin/env bash
# Nonaym DIY Phase 10BU — Final Execution Script
#
# STATUS: DO NOT RUN UNTIL A LATER APPROVED EXECUTION PHASE
#
# This script writes the verified Raspberry Pi OS Lite image to the UnifiPi target storage.
# Running it will overwrite the target device.
#
# Required gates before running:
# - Q approval of this exact script
# - Danno approval of this exact script
# - Human approval to execute
# - Exact approval phrase entered inside the script:
#   I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY
#
# Protected production target:
# - Protectli / ns2 quantaa / 10.1.1.109 must not be touched.

set -euo pipefail

cd /home/mslepikas/.openclaw/workspace || exit 1

IMG="nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz"
SHA="nonaym-dns/artifacts/raspios-lite-64bit-20260421/nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256"

TARGET_USER="mslepikas"
TARGET_IP="10.1.1.102"
TARGET_DEVICE="/dev/nvme0n1"

EXPECTED_HOST="UnifiPi"
EXPECTED_ARCH="aarch64"
EXPECTED_MODEL="SANZANG"
PROTECTED_IP="10.1.1.109"

echo "=== Phase 10 execution preflight: local checksum ==="
(
  cd "$(dirname "$IMG")" || exit 1
  sha256sum -c "$(basename "$SHA")"
)

echo
echo "=== Phase 10 execution preflight: protected target rejection ==="
if [ "$TARGET_IP" = "$PROTECTED_IP" ]; then
  echo "STOP: TARGET_IP is protected Protectli/ns2 quantaa IP"
  exit 20
fi

echo
echo "=== Phase 10 execution preflight: local host guard ==="
LOCAL_HOST="$(hostname)"
echo "LOCAL_HOST=$LOCAL_HOST"
if [ "$LOCAL_HOST" = "$EXPECTED_HOST" ]; then
  echo "STOP: script appears to be running on target host instead of omnieon"
  exit 21
fi

echo
echo "=== Phase 10 execution preflight: live hostname ==="
LIVE_HOST="$(ssh "${TARGET_USER}@${TARGET_IP}" "hostname")"
echo "LIVE_HOST=$LIVE_HOST"
if [ "$LIVE_HOST" != "$EXPECTED_HOST" ]; then
  echo "STOP: live hostname mismatch"
  exit 22
fi

echo
echo "=== Phase 10 execution preflight: live architecture ==="
LIVE_ARCH="$(ssh "${TARGET_USER}@${TARGET_IP}" "uname -m")"
echo "LIVE_ARCH=$LIVE_ARCH"
if [ "$LIVE_ARCH" != "$EXPECTED_ARCH" ]; then
  echo "STOP: live architecture mismatch"
  exit 23
fi

echo
echo "=== Phase 10 execution preflight: live target storage ==="
ssh "${TARGET_USER}@${TARGET_IP}" "lsblk -o NAME,TYPE,SIZE,MODEL,TRAN,ROTA,RM,MOUNTPOINTS"

LIVE_MODEL="$(ssh "${TARGET_USER}@${TARGET_IP}" "lsblk -dn -o MODEL ${TARGET_DEVICE} | sed -e 's/^ *//' -e 's/ *$//'")"
echo "LIVE_MODEL=$LIVE_MODEL"
if [ "$LIVE_MODEL" != "$EXPECTED_MODEL" ]; then
  echo "STOP: live storage model mismatch"
  exit 24
fi

echo
echo "=== Final human approval required ==="
echo "This will overwrite ${TARGET_IP}:${TARGET_DEVICE}"
echo "Type exactly: I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY"
read -r APPROVAL

if [ "$APPROVAL" != "I APPROVE PHASE 10 WRITE TO UNIFIPI ONLY" ]; then
  echo "STOP: approval phrase mismatch"
  exit 25
fi

echo
echo "=== EXECUTION: writing image to UnifiPi target storage ==="
xzcat "$IMG" | ssh "${TARGET_USER}@${TARGET_IP}" "sudo dd of=${TARGET_DEVICE} bs=4M"

echo
echo "=== Remote sync after write ==="
ssh "${TARGET_USER}@${TARGET_IP}" "sync"

echo
echo "=== Write completed. No reboot performed by this script. ==="
