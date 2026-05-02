# Linux Monitor System - Production Dashboard

A serious, professional local Linux system monitoring web application built with FastAPI + React + Tailwind + shadcn/ui.

## Features

- **Real-time Metrics**: CPU, GPU, RAM, disk, network, temperatures, uptime
- **Process Monitoring**: Top processes with CPU/memory usage
- **Professional UI**: Dense, technical, mature design using shadcn/ui
- **Graceful Fallbacks**: Handles missing GPU/sensors gracefully
- **Production Ready**: Systemd service, survives reboots, auto-restart
- **Local Data**: Uses psutil, lm-sensors, nvidia-smi for real metrics
- **No Cloud**: Everything runs locally on your machine

## Tech Stack

- **Backend**: Python FastAPI
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Systemd**: Service manager integration
- **Monitoring**: psutil, lm-sensors, nvidia-smi

## Prerequisites

- Python 3.10+
- Node.js 18+
- pip, npm
- Linux system (Ubuntu/Debian recommended)

## Installation

```bash
# Clone or use this directory
cd /home/mslepikas/.openclaw/workspace/linux-monitor-system

# Install Python dependencies
pip install -r requirements.txt

# Install Node dependencies
npm install

# Build production frontend
npm run build

# Create systemd service file
sudo cp linux-monitor-system.service /etc/systemd/system/

# Enable and start service
sudo systemctl enable linux-monitor-system
sudo systemctl start linux-monitor-system

# Configure firewall (optional)
sudo ufw allow 8000/tcp

# Check service status
sudo systemctl status linux-monitor-system

# Access dashboard
open http://localhost:8000
```

## Configuration

Edit `/home/mslepikas/.openclaw/workspace/linux-monitor-system/config.py` to customize:
- Port number
- CPU/GPU thresholds
- Refresh intervals
- Alert settings

## Production Notes

- Built with Vite for optimized bundles
- TypeScript for type safety
- Component-based architecture with shadcn/ui
- Graceful degradation for missing hardware
- Systemd auto-restart on failure
- Logs to journal for debugging

## Architecture

```
frontend/        # React + Vite production build
├── src/         # React components
│   ├── components/  # shadcn/ui components
│   ├── hooks/       # Custom hooks (useSystemInfo, useMetrics)
│   └── App.tsx      # Main app
├── package.json    # Node dependencies
└── vite.config.js  # Build config

backend/          # FastAPI backend
├── main.py        # FastAPI app
├── api/           # API endpoints
│   ├── cpu.py     # CPU metrics
│   ├── gpu.py     # GPU metrics
│   ├── memory.py  # RAM usage
│   ├── disk.py    # Disk I/O
│   ├── network.py # Network stats
│   ├── temp.py    # Temperatures
│   └── processes.py # Top processes
├── config.py      # Configuration
├── requirements.txt # Python dependencies
└── systemd/
    └── linux-monitor-system.service
```

## Monitoring Endpoints

- `/api/system` - Full system metrics
- `/api/cpu` - CPU usage per core
- `/api/gpu` - GPU utilization, memory, temperature
- `/api/memory` - RAM usage
- `/api/disk` - Disk I/O, mount points
- `/api/network` - Network interfaces, throughput
- `/api/temperature` - CPU/GPU/chassis temps
- `/api/processes` - Top processes by CPU/memory
- `/api/uptime` - System uptime, load average

## Systemd Service

The service file is located at:
`/home/mslepikas/.openclaw/workspace/linux-monitor-system/systemd/linux-monitor-system.service`

## Troubleshooting

```bash
# View logs
sudo journalctl -u linux-monitor-system -f

# Restart service
sudo systemctl restart linux-monitor-system

# Check dependencies
pip install -r requirements.txt
npm install
```

## License

MIT
