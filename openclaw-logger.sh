#!/usr/bin/env bash
# openclaw-logger.sh — Tail OpenClaw gateway logs to a file
# Usage:
#   ./openclaw-logger.sh              # start (runs in foreground)
#   ./openclaw-logger.sh stop          # stop the background tail
#   ./openclaw-logger.sh status        # check if running
#   ./openclaw-logger.sh tail          # show last 50 lines of captured log

set -euo pipefail

LOG_DIR="$HOME/.openclaw/logs"
PID_FILE="$LOG_DIR/openclaw-logger.pid"
LOG_FILE="$LOG_DIR/openclaw-gateway.log"

mkdir -p "$LOG_DIR"

case "${1:-}" in
  stop)
    if [ -f "$PID_FILE" ]; then
      pid=$(cat "$PID_FILE")
      if kill -0 "$pid" 2>/dev/null; then
        kill "$pid" 2>/dev/null && echo "Stopped logger (pid $pid)"
        rm -f "$PID_FILE"
      else
        echo "Logger not running (stale pid file removed)"
        rm -f "$PID_FILE"
      fi
    else
      echo "Logger is not running"
    fi
    ;;
  status)
    if [ -f "$PID_FILE" ]; then
      pid=$(cat "$PID_FILE")
      if kill -0 "$pid" 2>/dev/null; then
        echo "Logger running (pid $pid) → $LOG_FILE"
      else
        echo "Logger not running (stale pid file)"
        rm -f "$PID_FILE"
      fi
    else
      echo "Logger not running"
    fi
    ;;
  tail)
    if [ -f "$LOG_FILE" ]; then
      tail -50 "$LOG_FILE"
    else
      echo "No log file yet. Run: $0"
    fi
    ;;
  *)
    # Start — tail the journal into a file in the background
    if [ -f "$PID_FILE" ]; then
      pid=$(cat "$PID_FILE")
      if kill -0 "$pid" 2>/dev/null; then
        echo "Logger already running (pid $pid)"
        exit 0
      fi
    fi
    echo "Starting OpenClaw logger → $LOG_FILE"
    journalctl --user -u openclaw-gateway -f --no-pager > "$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
    echo "Logged (pid $!) to $LOG_FILE"
    ;;
esac
