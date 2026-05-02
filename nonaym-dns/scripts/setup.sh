#!/bin/bash
# Nonaym DNS Appliance - Automated Setup Script
# Installs Technitium DNS with Nonaym configuration

set -e

echo "=== Nonaym.ai DNS Appliance Setup ==="
echo ""

# Check if running as root
if [ "$(id -u)" -ne 0 ]; then
    echo "Error: This script must be run as root (sudo)"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker not found. Installing..."
    curl -fsSL https://get.docker.com | bash
    usermod -aG docker $USER
fi

# Pull Technitium DNS
echo "Pulling Technitium DNS Server..."
docker pull technitium/dns-server:latest

# Create config directories
mkdir -p /opt/nonaym/config/data
mkdir -p /opt/nonaym/config/log
mkdir -p /opt/nonaym/blocklists

echo "Creating docker-compose configuration..."
cat > /opt/nonaym/docker-compose.yml << 'EOF'
version: '3.8'

services:
  technitium-dns:
    image: technitium/dns-server:latest
    container_name: nonaym-dns
    restart: unless-stopped
    network_mode: host
    volumes:
      - /opt/nonaym/config/data:/etc/dns
      - /opt/nonaym/config/log:/var/log/dns
    environment:
      - DnsServerPrimaryPort=53
      - DnsServerDashboardPort=53443
EOF

# Start the service
echo "Starting Nonaym DNS..."
cd /opt/nonaym
docker compose up -d

echo ""
echo "=== Setup Complete ==="
echo "Web Dashboard: http://<server-ip>:53443"
echo "Initial setup wizard will appear on first access."
echo "Admin username: Admin (no password set)"
echo ""
echo "Next steps:"
echo "1. Open the web dashboard at port 53443"
echo "2. Set up admin password"
echo "3. Configure blocklists"
echo "4. Set your network to use this DNS server (port 53)"
echo "5. Import custom blocklists from /opt/nonaym/blocklists/"
