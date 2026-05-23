# Nonaym DIY Installer v1 - Dry Run Command Plan

## Overview

This document outlines the command plan that would be executed during a dry-run of the Nonaym DIY installer v1. The plan is for review purposes only and does not execute any actual commands.

## Mode 1 - Preflight Only

### System Information Collection
```bash
# Hardware
lscpu
cat /proc/cpuinfo
free -h
cat /proc/meminfo
lsblk -o NAME,MODEL,SIZE,TYPE,FSTYPE,MOUNTPOINTS
df -h

# Network
ip -o link show
cat /proc/net/dev

# OS Information
cat /etc/os-release
uname -a

# Hardware Detection
lshw -short 2>/dev/null || echo "lshw not available"
dmidecode -s system-manufacturer 2>/dev/null || echo "dmidecode not available"
dmidecode -s system-product-name 2>/dev/null || echo "dmidecode not available"

# Architecture
uname -m

# Boot mode
if [ -d /sys/firmware/efi ]; then
    echo "UEFI"
else
    echo "BIOS/Legacy, Raspberry Pi firmware, or unknown"
fi

# Raspberry Pi detection
if [ -r /proc/device-tree/model ]; then
    tr -d '\\0' < /proc/device-tree/model 2>/dev/null | grep -qi "raspberry pi" && echo "yes" || echo "no"
else
    grep -qi "raspberry pi" /proc/cpuinfo 2>/dev/null && echo "yes" || echo "no"
fi
```

### Report Generation
```bash
# Create timestamped report with all detected information
echo "Nonaym DIY Hardware Preflight Report"
echo "===================================="
echo "Script version: phase10j-v2.1"
echo "Date: $(date)"
echo "Hostname: $(hostname 2>/dev/null || echo unknown)"
echo "OS: $(cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2 | tr -d \")"
echo "Architecture: $(uname -m)"
echo "CPU cores: $(grep -c processor /proc/cpuinfo 2>/dev/null || echo 1)"
echo "Memory: $(awk '/MemTotal/ {printf "%d", $2/1024/1024}' /proc/meminfo 2>/dev/null || echo 0)GB"
```

## Mode 2 - Dry Run

### Install Plan Summary
```bash
# Show what would be done in install mode
echo "=== INSTALL PLAN SUMMARY ==="
echo "1. Check system requirements (architecture, OS, CPU, memory, disk)"
echo "2. Validate that ports 53 and 53443 are free"
echo "3. Check if Docker is installed"
echo "4. Validate installation environment (as root, path availability)"
echo "5. Generate installation report"
echo ""
echo "=== PACKAGES TO BE INSTALLED ==="
echo "docker.io"
echo "docker-compose"
echo ""
echo "=== DIRECTORIES TO BE CREATED ==="
echo "/opt/nonaym/config"
echo "/opt/nonaym/logs"
echo "/opt/nonaym/reports"
echo "/opt/nonaym/backups"
echo ""
echo "=== DOCKER COMMANDS ==="
echo "docker pull technitium/dns-server"
echo "docker-compose up -d nonaym-dns"
echo ""
echo "=== PORTS USED ==="
echo "TCP/UDP 53 - DNS service"
echo "TCP 53443 - Dashboard"
echo ""
echo "=== CONFIRMATION PROMPTS ==="
echo "CONTINUE NONAYM INSTALL"
echo "INSTALL NONAYM PACKAGES"
echo "START NONAYM DNS"
```

## Mode 3 - Guided Install (After Confirmation)

### System Validation
```bash
# Check if we're running as root (required for system install)
if [ "$EUID" -ne 0 ]; then
    echo "Error: Must run as root for system install"
    exit 1
fi

# Check system requirements
check_system_requirements() {
    echo "Checking system requirements..."
    # Check architecture
    ARCH=$(uname -m)
    if [[ "$ARCH" != "x86_64" && "$ARCH" != "aarch64" ]]; then
        echo "Unsupported architecture: $ARCH"
        exit 1
    fi
    
    # Check minimum RAM (at least 1GB)
    RAM_GB=$(free -g | awk '/^Mem:/{print $2}')
    if [ "$RAM_GB" -lt 1 ]; then
        echo "Insufficient RAM: $RAM_GB GB"
        exit 1
    fi
    
    # Check port availability
    check_port_availability 53
    check_port_availability 53443
}
```

### Directory Setup
```bash
# Create installation directories
mkdir -p /opt/nonaym/config
mkdir -p /opt/nonaym/logs
mkdir -p /opt/nonaym/reports
mkdir -p /opt/nonaym/backups
mkdir -p /opt/nonaym/scripts

# Set appropriate permissions
chmod 755 /opt/nonaym/config
chmod 755 /opt/nonaym/logs
chmod 755 /opt/nonaym/reports
chmod 755 /opt/nonaym/backups
chmod 755 /opt/nonaym/scripts
```

### Package Installation
```bash
# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    # Install Docker based on OS type
    if command -v apt-get &> /dev/null; then
        apt-get update -y
        apt-get install -y docker.io
        systemctl enable docker
        systemctl start docker
    elif command -v yum &> /dev/null; then
        yum install -y docker
        systemctl enable docker
        systemctl start docker
    fi
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    # Install Docker Compose
    if command -v apt-get &> /dev/null; then
        apt-get install -y docker-compose-plugin
    elif command -v yum &> /dev/null; then
        yum install -y docker-compose-plugin
    fi
fi
```

### Docker Setup
```bash
# Create docker-compose.yml
cat > /opt/nonaym/docker-compose.yml << EOF
version: '3'
services:
  nonaym-dns:
    image: technitium/dns-server
    container_name: nonaym-dns
    restart: unless-stopped
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "53443:53443/tcp"
    volumes:
      - ./config:/app/config
      - ./logs:/app/logs
EOF

# Pull Technitium image
docker pull technitium/dns-server

# Create config and log directories
mkdir -p /opt/nonaym/config
mkdir -p /opt/nonaym/logs
```

### Service Start
```bash
# Start the service
docker-compose -f /opt/nonaym/docker-compose.yml up -d

# Generate install report
echo "Installation complete!" > /opt/nonaym/reports/install-report-$(date +%Y%m%d-%H%M%S).txt
echo "Date: $(date)" >> /opt/nonaym/reports/install-report-$(date +%Y%m%d-%H%M%S).txt
echo "Installation completed successfully" >> /opt/nonaym/reports/install-report-$(date +%Y%m%d-%H%M%S).txt
```

## Confirmation Prompts

### Confirmation 1 - Continue Past Preflight
```bash
echo "=== CONTINUE NONAYM INSTALL ==="
echo "This will transition to installation preparation."
echo "Type: CONTINUE NONAYM INSTALL"
read -r user_input
if [ "$user_input" != "CONTINUE NONAYM INSTALL" ]; then
    echo "Installation cancelled."
    exit 1
fi
```

### Confirmation 2 - Install Packages
```bash
echo "=== INSTALL NONAYM PACKAGES ==="
echo "This will install required packages (Docker, Docker Compose)."
echo "Type: INSTALL NONAYM PACKAGES"
read -r user_input
if [ "$user_input" != "INSTALL NONAYM PACKAGES" ]; then
    echo "Installation cancelled."
    exit 1
fi
```

### Confirmation 3 - Start DNS Service
```bash
echo "=== START NONAYM DNS ==="
echo "This will start the DNS service."
echo "Type: START NONAYM DNS"
read -r user_input
if [ "$user_input" != "START NONAYM DNS" ]; then
    echo "Installation cancelled."
    exit 1
fi
```

### Confirmation 4 - Destructive Actions
```bash
echo "=== DANGEROUS ACTIONS WARNING ==="
echo "This may erase data."
echo "Type: I UNDERSTAND THIS MAY ERASE DATA"
read -r user_input
if [ "$user_input" != "I UNDERSTAND THIS MAY ERASE DATA" ]; then
    echo "Installation cancelled."
    exit 1
fi
```

## Validation Checks

### Port Conflict Detection
```bash
check_port_availability() {
    local port=$1
    if lsof -i :$port >/dev/null 2>&1; then
        echo "ERROR: Port $port is already in use!"
        echo "Stop the service using this port before continuing."
        exit 1
    fi
}
```

### Security Checks
```bash
# Check for existing DNS server
if [ -f "/etc/bind/named.conf.options" ] || [ -f "/etc/named.conf" ]; then
    echo "WARNING: Existing DNS server detected (BIND)."
    echo "This may conflict with the new installation."
fi

# Check status of systemd-resolved
if systemctl is-active --quiet systemd-resolved; then
    echo "systemd-resolved is active"
fi
```

## Rollback Plan

If installation fails, the following rollback steps are in place:
1. Stop the Technitium container
2. Remove the Docker Compose installation directory
3. Uninstall Docker packages if installed locally
4. Delete log files
5. Document any changes made