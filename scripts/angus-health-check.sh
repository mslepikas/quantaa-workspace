#!/usr/bin/env bash
set -euo pipefail

echo "Angus health check"
echo "=================="
echo "Time: $(date)"
echo

echo "System"
echo "------"
printf 'Uptime: '
uptime -p || true
printf 'Load: '
uptime | awk -F'load average: ' '{print $2}' || true
printf 'Kernel: '
uname -srmo || true
echo

echo "Memory"
echo "------"
free -h || true
echo

echo "Disk"
echo "----"
df -h / || true
echo

echo "OpenClaw"
echo "--------"
openclaw status || true
echo

echo "Services"
echo "--------"
for port in 18789 11434 8000 8081 44444; do
  if ss -tln | awk '{print $4}' | grep -q ":${port}$"; then
    echo "Port ${port}: listening"
  else
    echo "Port ${port}: not listening"
  fi
done
echo

echo "Processes"
echo "---------"
ps -ef | grep -E "openclaw|ollama|node server.js|linux-monitor-system|vite|uvicorn|fastapi" | grep -v grep || true

echo

echo "HTTP checks"
echo "-----------"
for url in http://localhost:8000 http://localhost:8081 http://localhost:44444; do
  if curl -fsS --max-time 3 "$url" >/dev/null 2>&1; then
    echo "$url: OK"
  else
    echo "$url: not responding"
  fi
done
