# Quantaa Mission Control Guide 🦞

## Overview
This guide explains how to use the new Mission Control system for managing all Quantaa agents.

## System Components

### 1. Task Queue System
- File: `agents/task-queue.json`
- Purpose: Centralized task management
- Usage:
  ```
  python agents/task-manager.py create scout "Research latest AI frameworks" high
  python agents/task-manager.py list
  python agents/task-manager.py complete task-001
  ```

### 2. Agent Status Dashboard
- File: `agents/status-display.md`
- File: `agents/mission-control-dashboard.md`
- Purpose: Real-time monitoring of all agents
- Usage: 
  ```
  ./agents/update-dashboard.sh
  ```

### 3. Cross-Agent Communication
- Directory: `agents/inbox/`
- Purpose: Shared messaging between agents
- Usage:
  ```
  # Create a message
  echo "Hello Ash, please review travel plans" > agents/inbox/ash_2026-04-29_1900.txt
  
  # Read messages
  ls agents/inbox/
  ```

### 4. System Health Monitoring
- Script: `agents/system-health-check.sh`
- Purpose: Regular system status checks
- Usage:
  ```
  ./agents/system-health-check.sh
  ```

### 5. Agent Monitoring
- Script: `agents/monitor-agents.py`
- Purpose: Update agent heartbeat timestamps
- Usage:
  ```
  python agents/monitor-agents.py
  ```

## Command Examples

### Task Management
```
# Create a new task for Scout
python agents/task-manager.py create scout "Research market trends" high

# List pending tasks
python agents/task-manager.py list

# Mark task as complete
python agents/task-manager.py complete task-001
```

### System Monitoring
```
# Update dashboard
./agents/update-dashboard.sh

# Run system health check
./agents/system-health-check.sh

# Update agent statuses
python agents/monitor-agents.py
```

## Agent Routing Rules
- **Web Development**: Q
- **Security**: Danno
- **Research**: Scout
- **Finance**: Fin
- **Social/Travel**: Ash
- **Housekeeping/Shopping**: Flo
- **Personal Assistant**: Jerrica
- **Health/Fitness**: Atlas

## Cross-Agent Communication Protocol
1. Messages are placed in `agents/inbox/` directory
2. File naming convention: `agentname_timestamp.txt`
3. All agents have read/write access to inbox
4. Messages are in plain text format

## Migration Status
- **Business agents**: Running on GB10 (current)
- **Personal agents**: Running on GB10, will migrate to Mac Mini when it arrives
- **Shared files**: All on GB10 (single source of truth)

## Next Steps
1. Implement Sunday automation workflows
2. Set up agent-to-agent decision hierarchy
3. Begin Mac Mini migration planning
4. Add auto-routing capabilities
5. Implement agent autonomy features

## Quick Reference
- `Q, show mission control dashboard` - View current status
- `Q, create task for scout` - Create new research task
- `Q, check agent status` - Run system health check
- `Q, send message to ash` - Communicate with social agent