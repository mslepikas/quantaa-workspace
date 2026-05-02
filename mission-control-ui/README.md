# Mission Control Dashboard

A compact UI to monitor all Quantaa agents at a glance.

## Live URL
`http://localhost:8001` (or LAN IP when `APP_HOST=0.0.0.0`)

## Features
- Agent roster (all 8 agents: Q, Danno, Scout, Fin, Ash, Flo, Jerrica, Atlas)
- Status indicators (active/idle/offline)
- Active tasks overview
- System health (Gateway, Ollama, models, load)
- Quick actions (spawn, restart, check)

## Tech Stack
- **Backend:** Express.js
- **Frontend:** Vanilla HTML/JS (no build needed for compactness)
- **Data:** OpenClaw APIs / gateway

## Quick Start
```bash
# Start backend
node server.js
```

## Port
`3001` (reserved for OpenClaw network monitoring)
