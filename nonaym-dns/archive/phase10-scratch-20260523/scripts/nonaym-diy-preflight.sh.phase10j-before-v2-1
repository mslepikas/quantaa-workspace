#!/bin/bash

# Nonaym DIY Hardware Inventory and Install Recommendation Script
# This is a read-only preflight script for phase 10B

set -e  # Exit on any error

# Generate timestamp for report filename
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPORT_DIR="$PROJECT_DIR/reports"
mkdir -p "$REPORT_DIR"
REPORT_FILE="$REPORT_DIR/nonaym-hardware-report-${TIMESTAMP}.txt"

# Function to log output to both console and report
log() {
    echo "$1" | tee -a "$REPORT_FILE"
}

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        log "WARNING: This script is designed to run without root privileges."
    fi
}

# Function to detect system architecture
detect_architecture() {
    uname -m
}

# Function to detect if system is Raspberry Pi
is_raspberry_pi() {
    # Method 1: Check /proc/cpuinfo for Raspberry Pi
    if [ -f "/proc/cpuinfo" ]; then
        if grep -q "Raspberry Pi" "/proc/cpuinfo"; then
            echo "yes"
            return
        fi
    fi
    
    # Method 2: Check device tree model
    if [ -f "/sys/firmware/devicetree/base/model" ]; then
        if grep -q "Raspberry Pi" "/sys/firmware/devicetree/base/model"; then
            echo "yes"
            return
        fi
    fi
    
    # Method 3: Check for Raspberry Pi specific files in /proc
    if [ -f "/proc/device-tree/model" ]; then
        if grep -q "Raspberry Pi" "/proc/device-tree/model"; then
            echo "yes"
            return
        fi
    fi
    
    echo "no"
}

# Function to get CPU information
get_cpu_info() {
    log ""; log "--- CPU Information ---"
    
    if command -v lscpu &> /dev/null; then
        lscpu | grep -E "Model name|CPU(s)|Thread(s) per core|Core(s) per socket|CPU max MHz|CPU min MHz" | head -10 >> "$REPORT_FILE"
    fi

    if [ -f /proc/cpuinfo ]; then
        log "CPU Info (/proc/cpuinfo):"
        grep "model name" /proc/cpuinfo | head -1 >> "$REPORT_FILE"
        grep "cpu cores" /proc/cpuinfo | head -1 >> "$REPORT_FILE"
        grep "siblings" /proc/cpuinfo | head -1 >> "$REPORT_FILE"
    fi
}

# Function to get memory information
get_memory_info() {
    log ""; log "--- Memory Information ---"
    
    if command -v free &> /dev/null; then
        free -h >> "$REPORT_FILE"
    fi
    
    if [ -f /proc/meminfo ]; then
        log "Memory Info (/proc/meminfo):"
        grep "MemTotal\|MemAvailable" /proc/meminfo >> "$REPORT_FILE"
    fi
}

# Function to get disk information
get_disk_info() {
    log ""; log "--- Disk Information ---"
    
    if command -v lsblk &> /dev/null; then
        lsblk -f >> "$REPORT_FILE"
    fi

    if command -v df &> /dev/null; then
        df -h >> "$REPORT_FILE"
    fi
}

# Function to get hardware information
get_hardware_info() {
    log ""; log "--- Hardware Information ---"
    
    # Try to use lshw if available
    if command -v lshw &> /dev/null; then
        lshw -short 2>/dev/null >> "$REPORT_FILE" || log "lshw failed or not available"
    else
        log "lshw not available"
    fi
    
    # Get model info from DMI
    if command -v dmidecode &> /dev/null; then
        log "DMI info (system):"
        dmidecode -s system-manufacturer 2>/dev/null | head -1 >> "$REPORT_FILE" || log "dmidecode manufacturer query failed"
        dmidecode -s system-product-name 2>/dev/null | head -1 >> "$REPORT_FILE" || log "dmidecode product query failed"
        dmidecode -s system-version 2>/dev/null | head -1 >> "$REPORT_FILE" || log "dmidecode version query failed"
        dmidecode -s system-serial-number 2>/dev/null | head -1 >> "$REPORT_FILE" || log "dmidecode serial query failed"
    else
        log "dmidecode not available"
    fi
}

# Function to determine recommended installation profile
determine_profile() {
    local arch
    arch=$(detect_architecture)

    local is_pi
    is_pi=$(is_raspberry_pi)

    local cpu_cores=1
    local memory_gb=1

    if [ -f /proc/cpuinfo ]; then
        cpu_cores=$(grep -c "processor" /proc/cpuinfo 2>/dev/null || echo 1)
    fi

    if [ -f /proc/meminfo ]; then
        memory_gb=$(awk '/MemTotal/ {printf "%d", $2/1024/1024}' /proc/meminfo 2>/dev/null || echo 1)
    fi

    log ""
    log "--- Installation Profile Recommendation ---"
    log "CPU cores: $cpu_cores"
    log "Memory: ${memory_gb}GB"
    log "Raspberry Pi detected: $is_pi"

    if [[ "$arch" == *"aarch64"* ]] || [[ "$arch" == *"arm64"* ]]; then
        if [ "$is_pi" = "yes" ]; then
            if [ "$memory_gb" -ge 2 ]; then
                log "Recommended Profile: Raspberry Pi / ARM64 Profile"
                log "Reason: Raspberry Pi ARM64 detected with sufficient memory"
            else
                log "Recommended Profile: ARM Caution / Not Recommended"
                log "Reason: Raspberry Pi ARM64 detected but memory is below 2GB"
            fi
        else
            if [ "$memory_gb" -ge 4 ]; then
                log "Recommended Profile: Generic ARM64 / Lab Profile"
                log "Reason: ARM64 system with sufficient memory, but Raspberry Pi was not detected; treat as lab validation, not public DIY baseline"
            else
                log "Recommended Profile: ARM Caution / Not Recommended"
                log "Reason: ARM64 detected, but Raspberry Pi was not confirmed and memory is limited"
            fi
        fi
    elif [ "$arch" = "x86_64" ]; then
        if [ "$memory_gb" -lt 2 ]; then
            log "Recommended Profile: x86_64 Caution / Not Recommended"
            log "Reason: x86_64 architecture but insufficient memory (<2GB)"
        elif [ "$cpu_cores" -lt 2 ]; then
            log "Recommended Profile: Lightweight x86_64 Profile"
            log "Reason: x86_64 architecture with low CPU count (<2 cores)"
        elif [ "$memory_gb" -lt 4 ]; then
            log "Recommended Profile: Lightweight x86_64 Profile"
            log "Reason: x86_64 architecture with medium memory (2-4GB)"
        else
            log "Recommended Profile: Standard x86_64 Profile"
            log "Reason: x86_64 architecture with sufficient resources"
        fi
    else
        log "Recommended Profile: Unsupported Architecture"
        log "Reason: Unsupported architecture ($arch)"
    fi
}

# Function to display summary
show_summary() {
    log ""; log "--- Summary ---"
    log "Hardware preflight completed successfully"
    log "Report saved to: $REPORT_FILE"
}

# Main execution
main() {
    log "Nonaym DIY Hardware Preflight Report"
    log "===================================="
    
    # Check if running as root
    check_root
    
    # Get system information
    get_cpu_info
    get_memory_info
    get_disk_info
    get_hardware_info
    
    # Determine recommended profile
    determine_profile
    
    # Show summary
    show_summary
    
    log ""; log "--- End of Report ---"
    
    echo "Preflight script completed. Report saved to: $REPORT_FILE"
}

# Run main function
main "$@"