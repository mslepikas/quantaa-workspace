# Nonaym DIY Installer v1 - Design and Dry Run Plan

## Summary

This document consolidates the design and dry run plan for the Nonaym DIY installer v1 as established in Phase 10M. The installer must be designed conservatively and align with the safety principles defined in Phase 10M.

## Installation Modes

### Mode 1 - Preflight Only
**Purpose:** Run inventory and compatibility checks only.

**Allowed Actions:**
- Read hardware information
- Read OS information
- Read disk capacity
- Read network adapter inventory
- Create local report

**Disallowed Actions:**
- Package installation
- Docker installation
- Technitium installation
- Disk formatting
- DNS changes
- Network changes
- Firewall changes
- Service starts/stops

### Mode 2 - Dry Run
**Purpose:** Show exactly what the installer would do without doing it.

**Allowed Actions:**
- Print install plan
- List packages that would be installed
- List directories that would be created
- List Docker commands that would be run
- List ports that would be used
- List confirmation prompts

**Disallowed Actions:**
- Installing packages
- Modifying disks
- Starting services
- Changing DNS
- Changing network settings

### Mode 3 - Guided Install
**Purpose:** Perform installation only after explicit confirmation.

**Allowed Actions (after confirmation only):**
- Install required OS packages
- Create Nonaym directories
- Install or configure Docker
- Place docker-compose.yml
- Pull Technitium image
- Create local config/log directories
- Start Technitium container
- Generate install report

**Disallowed Actions (without confirmation):**
- Format or repartition disks
- Overwrite existing DNS server config
- Change router DHCP/DNS settings
- Expose dashboard publicly
- Open firewall to WAN
- Upload inventory to cloud
- Collect customer private data

## Confirmation Gates

### Confirmation 1 - Continue Past Preflight
**Required Phrase:** `CONTINUE NONAYM INSTALL`
**Purpose:** Move from preflight/dry-run to install preparation.

### Confirmation 2 - Install Packages
**Required Phrase:** `INSTALL NONAYM PACKAGES`
**Purpose:** Allow package installation such as Docker dependencies.

### Confirmation 3 - Start DNS Service
**Required Phrase:** `START NONAYM DNS`
**Purpose:** Allow Technitium container/service start.

### Confirmation 4 - Destructive Actions
**Required Phrase:** `I UNDERSTAND THIS MAY ERASE DATA`
**Purpose:** Required before any disk formatting or repartitioning.

> Note: Destructive disk actions are not approved for the first installer version.

## Target Paths

**System Install Path:**
```
/opt/nonaym/
  docker-compose.yml
  config/
  logs/
  reports/
  backups/
  scripts/
```

**User-Space Test Path:**
```
~/nonaym/
```

Use user-space layout during early tests unless system install is explicitly approved.

## Docker Compose Configuration

### Technitium Service Configuration
- Image: `technitium/dns-server`
- Container name: `nonaym-dns`
- Restart policy: `unless-stopped`
- DNS port: `53`
- Dashboard port: `53443`
- Config volume
- Log volume

### Network Mode
- Host networking will be used but requires review.
- Host networking may be simple but should be documented clearly because port 53 conflicts are common.

## Required Pre-Install Checks

Before guided install, the installer must check:
- Architecture
- OS family/version
- CPU cores
- RAM
- Disk capacity
- Free space
- Ethernet availability
- Port 53 availability
- Port 53443 availability
- Docker installed or not
- Existing DNS services
- systemd-resolved status
- NetworkManager status
- Firewall status if readable
- Whether running as root
- Whether target directories already exist

## Port Conflict Detection

Installer must detect if these are in use:
- TCP/UDP 53
- TCP 53443
- Any future dashboard port

If port 53 is already in use, installer must stop and explain.
It must not automatically disable system services without confirmation.

## Installer v1 Scope

### What is Included
- Debian-based systems first
- x86_64 standard profile first
- Raspberry Pi ARM64 as separate installer path
- Technitium via Docker Compose
- Host networking only if reviewed
- Local-only dashboard unless explicitly changed
- Local reports only
- No cloud upload
- No payment integration
- No customer account integration
- No automatic router modification

### What is NOT Included
- Payment/checkout
- Customer dashboard
- R2 customer lead writes
- Automatic public exposure
- Automatic router login
- Automatic ISP router modification
- VPN/Tailscale setup
- AI summarizer
- Model downloads
- Remote management
- Telemetry upload
- Destructive disk formatting
- Multi-machine orchestration

## Security and Privacy Requirements

### Private Data Rules
The installer must not upload:
- IP addresses
- Router details
- Serial numbers
- Wi-Fi names
- Private network topology
- Logs
- Hardware report

Unless a future explicit opt-in support flow is separately reviewed.
Local reports are allowed.

### Customer-Facing Requirements

Before public installer release, Nonaym should have:
- Public requirements page
- Preflight download page
- Checksum verification instructions
- Install risk disclaimer
- Backup reminder
- Privacy/security page links
- Support email
- Known supported hardware list
- Known unsupported hardware list
- Clear "do not install on your main work computer unless backed up" warning

## Review Gate Requirements

Before any install-capable script is written, the following must be reviewed:
- Installer plan
- Command list
- Confirmation prompts
- Rollback plan
- Target paths
- Port behavior
- Docker behavior
- Technitium config behavior
- Logging behavior
- Privacy impact
- Security risks

Danno/security review is required before implementation.

## Dry Run Command Plan

### Mode 1 - Preflight Only

#### System Information Collection
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

#### Report Generation
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

### Mode 2 - Dry Run

#### Install Plan Summary
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

### Mode 3 - Guided Install (After Confirmation)

#### System Validation
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

#### Directory Setup
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

#### Package Installation
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

#### Docker Setup
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

#### Service Start
```bash
# Start the service
docker-compose -f /opt/nonaym/docker-compose.yml up -d

# Generate install report
echo "Installation complete!" > /opt/nonaym/reports/install-report-$(date +%Y%m%d-%H%M%S).txt
echo "Date: $(date)" >> /opt/nonaym/reports/install-report-$(date +%Y%m%d-%H%M%S).txt
echo "Installation completed successfully" >> /opt/nonaym/reports/install-report-$(date +%Y%m%d-%H%M%S).txt
```

### Confirmation Prompts

#### Confirmation 1 - Continue Past Preflight
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

#### Confirmation 2 - Install Packages
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

#### Confirmation 3 - Start DNS Service
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

#### Confirmation 4 - Destructive Actions
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

### Validation Checks

#### Port Conflict Detection
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

#### Security Checks
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

### Rollback Plan

If installation fails, the following rollback steps are in place:
1. Stop the Technitium container
2. Remove the Docker Compose installation directory
3. Uninstall Docker packages if installed locally
4. Delete log files
5. Document any changes made

## Implementation Notes

The installer will be implemented in several stages:

1. **Phase 10N** - Design and dry-run command plan (completed)
2. **Phase 10O** - Draft actual install script
3. **Phase 10P** - Integration testing with preflight
4. **Phase 10Q** - Security review and finalization
5. **Phase 10R** - Release preparation

The installer must be conservative and follow all safety principles defined in Phase 10M.