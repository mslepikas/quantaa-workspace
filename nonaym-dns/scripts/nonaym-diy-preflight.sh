#!/bin/bash

# Nonaym DIY Hardware Inventory and Install Recommendation Script
# Phase 10J — v2.1
#
# Read-only preflight script.
# This script does not install packages, change disks, change DNS,
# change networking, start services, or modify firewall rules.

set -u

SCRIPT_VERSION="phase10j-v2.1"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Save reports next to the script package by default.
# This works both inside the repo and when copied standalone to a test machine.
REPORT_DIR="$SCRIPT_DIR/reports"
REPORT_FILE="$REPORT_DIR/nonaym-hardware-report-${TIMESTAMP}.txt"

mkdir -p "$REPORT_DIR"

WARNINGS=()
RESULT="FAIL"
PROFILE="Unsupported Architecture"
REASON="Not evaluated yet"

log() {
    echo "$1" | tee -a "$REPORT_FILE"
}

detect_architecture() {
    uname -m 2>/dev/null || echo "unknown"
}

detect_os() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        echo "${PRETTY_NAME:-unknown}"
    else
        echo "unknown"
    fi
}

detect_boot_mode() {
    if [ -d /sys/firmware/efi ]; then
        echo "UEFI"
    else
        echo "BIOS/Legacy, Raspberry Pi firmware, or unknown"
    fi
}

is_raspberry_pi() {
    if [ -r /proc/device-tree/model ]; then
        tr -d '\0' < /proc/device-tree/model 2>/dev/null | grep -qi "raspberry pi" && {
            echo "yes"
            return
        }
    fi

    grep -qi "raspberry pi" /proc/cpuinfo 2>/dev/null && {
        echo "yes"
        return
    }

    echo "no"
}

detect_cpu_cores() {
    if [ -f /proc/cpuinfo ]; then
        local cores
        cores="$(grep -c "^processor" /proc/cpuinfo 2>/dev/null || true)"
        if [ -n "$cores" ] && [ "$cores" -gt 0 ] 2>/dev/null; then
            echo "$cores"
        else
            echo 1
        fi
    else
        echo 1
    fi
}

detect_memory_gb() {
    if [ -f /proc/meminfo ]; then
        awk '/MemTotal/ {printf "%d", $2/1024/1024}' /proc/meminfo 2>/dev/null || echo 1
    else
        echo 1
    fi
}

detect_total_disk_gb() {
    if command -v lsblk >/dev/null 2>&1; then
        lsblk -b -dn -o SIZE,TYPE 2>/dev/null | awk '$2=="disk"{sum+=$1} END{if(sum>0){printf "%d", sum/1024/1024/1024}else{print 0}}'
    else
        echo 0
    fi
}

detect_root_free_gb() {
    if command -v df >/dev/null 2>&1; then
        df -BG / 2>/dev/null | awk 'NR==2 {gsub("G","",$4); print $4+0}'
    else
        echo 0
    fi
}

detect_ethernet_count() {
    if command -v ip >/dev/null 2>&1; then
        ip -o link show 2>/dev/null | awk -F': ' '$2 ~ /^(en|eth)/ {count++} END {print count+0}'
    else
        echo 0
    fi
}

detect_wifi_count() {
    if command -v ip >/dev/null 2>&1; then
        ip -o link show 2>/dev/null | awk -F': ' '$2 ~ /^(wl|wlan|ath)/ {count++} END {print count+0}'
    else
        echo 0
    fi
}

add_warning() {
    WARNINGS+=("$1")
}

get_cpu_info() {
    log ""
    log "--- CPU Information ---"

    if command -v lscpu >/dev/null 2>&1; then
        lscpu | grep -E "Architecture|Model name|CPU\(s\)|Thread\(s\) per core|Core\(s\) per socket" | head -12 >> "$REPORT_FILE" || true
    fi

    if [ -f /proc/cpuinfo ]; then
        log "CPU Info (/proc/cpuinfo):"
        grep -E "model name|Hardware|Model|processor" /proc/cpuinfo | head -8 >> "$REPORT_FILE" || true
    fi
}

get_memory_info() {
    log ""
    log "--- Memory Information ---"

    if command -v free >/dev/null 2>&1; then
        free -h >> "$REPORT_FILE" || true
    fi

    if [ -f /proc/meminfo ]; then
        log "Memory Info (/proc/meminfo):"
        grep "MemTotal\|MemAvailable" /proc/meminfo >> "$REPORT_FILE" || true
    fi
}

get_disk_info() {
    log ""
    log "--- Disk Information ---"

    if command -v lsblk >/dev/null 2>&1; then
        lsblk -o NAME,MODEL,SIZE,TYPE,FSTYPE,MOUNTPOINTS >> "$REPORT_FILE" || true
    fi

    if command -v df >/dev/null 2>&1; then
        df -h >> "$REPORT_FILE" || true
    fi
}

get_network_info() {
    log ""
    log "--- Network Information ---"

    if command -v ip >/dev/null 2>&1; then
        ip -o link show >> "$REPORT_FILE" || true
    else
        log "ip command not available"
    fi
}

get_hardware_info() {
    log ""
    log "--- Hardware Information ---"

    if command -v lshw >/dev/null 2>&1; then
        lshw -short 2>/dev/null >> "$REPORT_FILE" || log "lshw failed or requires elevated permissions"
    else
        log "lshw not available"
    fi

    if command -v dmidecode >/dev/null 2>&1; then
        log "DMI info (system):"
        dmidecode -s system-manufacturer 2>/dev/null | head -1 >> "$REPORT_FILE" || log "dmidecode manufacturer query failed or requires elevated permissions"
        dmidecode -s system-product-name 2>/dev/null | head -1 >> "$REPORT_FILE" || log "dmidecode product query failed or requires elevated permissions"
    else
        log "dmidecode not available"
    fi
}

recommend_profile_and_result() {
    local arch="$1"
    local is_pi="$2"
    local cpu_cores="$3"
    local memory_gb="$4"
    local total_disk_gb="$5"
    local root_free_gb="$6"
    local ethernet_count="$7"

    PROFILE="Unsupported Architecture"
    REASON="Unsupported architecture ($arch)"
    RESULT="FAIL"

    if [[ "$arch" == "aarch64" || "$arch" == "arm64" ]]; then
        if [ "$is_pi" = "yes" ]; then
            if [ "$memory_gb" -ge 4 ] && [ "$total_disk_gb" -ge 16 ]; then
                PROFILE="Raspberry Pi / ARM64 Profile"
                REASON="Raspberry Pi ARM64 detected with recommended-class memory and storage"
                RESULT="PASS"
            elif [ "$memory_gb" -ge 2 ] && [ "$total_disk_gb" -ge 16 ]; then
                PROFILE="Raspberry Pi / ARM64 Profile"
                REASON="Raspberry Pi ARM64 meets draft minimum but is below recommended RAM"
                RESULT="CAUTION"
                add_warning "Raspberry Pi RAM is below recommended 4GB"
            else
                PROFILE="ARM Caution / Not Recommended"
                REASON="Raspberry Pi ARM64 detected but memory or storage is below draft minimum"
                RESULT="FAIL"
            fi
        else
            if [ "$memory_gb" -ge 4 ] && [ "$total_disk_gb" -ge 32 ]; then
                PROFILE="Generic ARM64 / Lab Profile"
                REASON="ARM64 system has sufficient resources but is not Raspberry Pi public DIY baseline"
                RESULT="CAUTION"
                add_warning "Generic ARM64 is lab validation only, not public DIY baseline"
            else
                PROFILE="ARM Caution / Not Recommended"
                REASON="ARM64 detected, but Raspberry Pi was not confirmed or resources are limited"
                RESULT="FAIL"
            fi
        fi

    elif [[ "$arch" == "x86_64" || "$arch" == "amd64" ]]; then
        if [ "$cpu_cores" -ge 4 ] && [ "$memory_gb" -ge 7 ] && [ "$total_disk_gb" -ge 32 ]; then
            PROFILE="Standard x86_64 Profile"
            REASON="x86_64 architecture with recommended-class CPU, memory, and storage"
            RESULT="PASS"
        elif [ "$cpu_cores" -ge 2 ] && [ "$memory_gb" -ge 4 ] && [ "$total_disk_gb" -ge 32 ]; then
            PROFILE="Standard x86_64 Profile"
            REASON="x86_64 architecture meets draft minimum requirements"
            RESULT="CAUTION"
            add_warning "Meets minimum but below recommended 4 cores / 8GB class"
        elif [ "$cpu_cores" -ge 2 ] && [ "$memory_gb" -ge 2 ] && [ "$total_disk_gb" -ge 16 ]; then
            PROFILE="Lightweight x86_64 Candidate"
            REASON="x86_64 architecture may support lightweight future profile"
            RESULT="CAUTION"
            add_warning "Lightweight profile is not publicly promised yet"
        else
            PROFILE="x86_64 Caution / Not Recommended"
            REASON="x86_64 detected but CPU, memory, or storage is below draft minimum"
            RESULT="FAIL"
        fi
    fi

    if [ "$ethernet_count" -lt 1 ]; then
        add_warning "No Ethernet adapter detected; Wi-Fi-only setups need review"
        if [ "$RESULT" = "PASS" ]; then
            RESULT="CAUTION"
        fi
    fi

    if [ "$root_free_gb" -gt 0 ] && [ "$root_free_gb" -lt 8 ]; then
        add_warning "Root filesystem has less than 8GB free"
        if [ "$RESULT" = "PASS" ]; then
            RESULT="CAUTION"
        fi
    fi

    if [ "$total_disk_gb" -eq 0 ]; then
        add_warning "Total disk capacity could not be detected"
        if [ "$RESULT" = "PASS" ]; then
            RESULT="CAUTION"
        fi
    fi
}

write_final_result() {
    local os_name="$1"
    local boot_mode="$2"
    local arch="$3"
    local is_pi="$4"
    local cpu_cores="$5"
    local memory_gb="$6"
    local total_disk_gb="$7"
    local root_free_gb="$8"
    local ethernet_count="$9"
    local wifi_count="${10}"

    log ""
    log "--- Nonaym DIY Final Result ---"
    log "Script version: $SCRIPT_VERSION"
    log "OS: $os_name"
    log "Boot mode: $boot_mode"
    log "Architecture: $arch"
    log "CPU cores: $cpu_cores"
    log "Memory: ${memory_gb}GB"
    log "Detected total disk capacity: ${total_disk_gb}GB"
    log "Root filesystem free: ${root_free_gb}GB"
    log "Ethernet adapters detected: $ethernet_count"
    log "Wi-Fi adapters detected: $wifi_count"
    log "Raspberry Pi detected: $is_pi"
    log "Recommended Profile: $PROFILE"
    log "Reason: $REASON"
    log "NONAYM DIY RESULT: $RESULT"
    log "Warnings:"

    if [ "${#WARNINGS[@]}" -eq 0 ]; then
        log "- none"
    else
        for warning in "${WARNINGS[@]}"; do
            log "- $warning"
        done
    fi

    log ""
    if [ "$RESULT" = "PASS" ]; then
        log "Next step: safe to continue to installer planning for this hardware class."
    elif [ "$RESULT" = "CAUTION" ]; then
        log "Next step: review warnings before continuing to installer planning."
    else
        log "Next step: do not continue to installer planning on this hardware without review."
    fi
}

main() {
    log "Nonaym DIY Hardware Preflight Report"
    log "===================================="
    log "Script version: $SCRIPT_VERSION"
    log "Date: $(date)"
    log "Hostname: $(hostname 2>/dev/null || echo unknown)"

    if [ "${EUID:-$(id -u)}" -eq 0 ]; then
        log "WARNING: This script is designed to run without root privileges."
    fi

    local arch
    local os_name
    local boot_mode
    local is_pi
    local cpu_cores
    local memory_gb
    local total_disk_gb
    local root_free_gb
    local ethernet_count
    local wifi_count

    arch="$(detect_architecture)"
    os_name="$(detect_os)"
    boot_mode="$(detect_boot_mode)"
    is_pi="$(is_raspberry_pi)"
    cpu_cores="$(detect_cpu_cores)"
    memory_gb="$(detect_memory_gb)"
    total_disk_gb="$(detect_total_disk_gb)"
    root_free_gb="$(detect_root_free_gb)"
    ethernet_count="$(detect_ethernet_count)"
    wifi_count="$(detect_wifi_count)"

    get_cpu_info
    get_memory_info
    get_disk_info
    get_network_info
    get_hardware_info

    log ""
    log "--- Installation Profile Recommendation ---"
    log "CPU cores: $cpu_cores"
    log "Memory: ${memory_gb}GB"
    log "Raspberry Pi detected: $is_pi"

    recommend_profile_and_result "$arch" "$is_pi" "$cpu_cores" "$memory_gb" "$total_disk_gb" "$root_free_gb" "$ethernet_count"

    log "Recommended Profile: $PROFILE"
    log "Reason: $REASON"

    write_final_result "$os_name" "$boot_mode" "$arch" "$is_pi" "$cpu_cores" "$memory_gb" "$total_disk_gb" "$root_free_gb" "$ethernet_count" "$wifi_count"

    log ""
    log "--- End of Report ---"
    log "Report saved to: $REPORT_FILE"

    echo "Preflight script completed. Report saved to: $REPORT_FILE"
}

main "$@"
