#!/bin/bash

# Update Mission Control Dashboard
# This script updates the status display and task queue

echo "Updating Mission Control Dashboard..."

# Update timestamp in status display
sed -i "s/_Last updated: .*/_Last updated: $(date '+%Y-%m-%d %H:%M ET')/" agents/status-display.md

# Update timestamp in mission control dashboard
sed -i "s/_Last Update: .*/_Last Update: $(date '+%Y-%m-%d %H:%M ET')/" agents/mission-control-dashboard.md

# Update coordination file timestamp
jq --arg timestamp "$(date -u +%Y-%m-%dT%H:%M:%S-04:00)" '.updated = $timestamp' agents/coordination.json > temp_coord.json && mv temp_coord.json agents/coordination.json

echo "Dashboard updated successfully!"
echo "Last updated: $(date)"