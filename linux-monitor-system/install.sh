#!/bin/bash

# Linux Monitor System - Installation Script
# This script installs and configures the monitoring dashboard

set -e

echo "🐧 Installing Linux Monitor System..."

# Check Python version
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is required but not installed."
    exit 1
fi

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    exit 1
fi

# Create directories
mkdir -p /home/mslepikas/.openclaw/workspace/linux-monitor-system/backend
mkdir -p /home/mslepikas/.openclaw/workspace/linux-monitor-system/frontend/dist

# Navigate to workspace
cd /home/mslepikas/.openclaw/workspace/linux-monitor-system

# Install Python dependencies
echo "🔧 Installing Python dependencies..."
pip install -r requirements.txt

# Install Node dependencies
echo "🔧 Installing Node dependencies..."
npm install

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Copy service file
cp systemd/linux-monitor-system.service /etc/systemd/system/

# Reload systemd
systemctl daemon-reload

# Enable and start service
echo "🚀 Starting service..."
systemctl enable linux-monitor-system
systemctl start linux-monitor-system

# Configure firewall
if command -v ufw &> /dev/null; then
    echo "🔒 Configuring firewall..."
    ufw allow 8000/tcp
fi

# Check service status
echo "✅ Service status:"
systemctl status linux-monitor-system --no-pager

echo ""
echo "🖥️  Dashboard URL: http://localhost:8000"
echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Open your browser to http://localhost:8000"
echo "2. Check logs with: sudo journalctl -u linux-monitor-system -f"
echo "3. Stop the service: sudo systemctl stop linux-monitor-system"
