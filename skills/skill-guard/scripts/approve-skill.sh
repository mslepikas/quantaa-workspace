#!/usr/bin/env bash
# Danno Skill Approval Guardrail
# Blocks any skill install unless:
# 1. It passes mcp-scan (skill-guard)
# 2. Danno approves the scan results
# 3. Mark approves the final decision

set -euo pipefail

SKILL_SLUG="$1"
WORKSPACE="/home/mslepikas/.openclaw/workspace"
GUARD_DIR="${WORKSPACE}/skills/skill-guard"
LOG_DIR="${WORKSPACE}/skills/skill-guard/logs"
mkdir -p "$LOG_DIR"

LOG="${LOG_DIR}/$(date +%Y%m%d-%H%M%S)-${SKILL_SLUG}.log"

echo "=== SKILL APPROVAL GUARDRAIL ===" > "$LOG"
echo "Requested: ${SKILL_SLUG}" >> "$LOG"
echo "Requested at: $(date)" >> "$LOG"
echo "" >> "$LOG"

# Step 1: Download to staging
echo "[1/3] Downloading ${SKILL_SLUG} to staging..." >> "$LOG"
STAGING="/tmp/skill-guard-staging/skills/${SKILL_SLUG}"
mkdir -p "$STAGING"
if command -v clawhub &>/dev/null; then
    clawhub install "${SKILL_SLUG}" --dest "${STAGING}" 2>&1 | tee -a "$LOG" || {
        echo "[FAIL] clawhub install failed" >> "$LOG"
        echo "RESULT:FAIL"
        exit 1
    }
else
    echo "[SKIP] clawhub not installed, downloading from ClawHub API" >> "$LOG"
    curl -sL "https://clawhub.ai/api/skills/${SKILL_SLUG}" -o "/tmp/${SKILL_SLUG}.tar.gz" 2>&1 | tee -a "$LOG"
    tar xzf "/tmp/${SKILL_SLUG}.tar.gz" -C "$STAGING" 2>/dev/null || true
fi

# Step 2: Scan with mcp-scan
echo "" >> "$LOG"
echo "[2/3] Scanning with mcp-scan..." >> "$LOG"
if [ -f "${GUARD_DIR}/scripts/mcp-scan" ]; then
    uv run ${GUARD_DIR}/scripts/mcp-scan "${STAGING}" 2>&1 | tee -a "$LOG"
elif command -v mcp-scan &>/dev/null; then
    mcp-scan "${STAGING}" 2>&1 | tee -a "$LOG"
else
    echo "[WARN] mcp-scan not found, doing basic content scan" >> "$LOG"
    grep -riE "(exfiltrat|b64decode|curl.*\$|eval\(|exec\(|\$\(|rm\s+-rf|chmod.*777|/etc/passwd|api.key|secret)" "${STAGING}" 2>&1 | tee -a "$LOG" || echo "[PASS] No obvious threats found" >> "$LOG"
fi

echo "" >> "$LOG"
echo "[3/3] AWAITING APPROVAL" >> "$LOG"
echo "Log file: ${LOG}" >> "$LOG"
echo "RESULT:WAITING"
echo "${LOG}"
