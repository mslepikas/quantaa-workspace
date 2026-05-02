import os
import platform
import socket
from datetime import datetime

import psutil


def get_system_info():
    vm = psutil.virtual_memory()
    boot_ts = psutil.boot_time()
    cpu_freq = psutil.cpu_freq()
    load_1, load_5, load_15 = os.getloadavg() if hasattr(os, "getloadavg") else (0.0, 0.0, 0.0)

    return {
        "hostname": socket.gethostname(),
        "platform": platform.system(),
        "platform_release": platform.release(),
        "platform_version": platform.version(),
        "architecture": platform.machine(),
        "processor": platform.processor(),
        "cpu_logical": psutil.cpu_count(logical=True),
        "cpu_physical": psutil.cpu_count(logical=False),
        "cpu_freq_current": round((cpu_freq.current or 0) / 1000, 2) if cpu_freq else None,
        "cpu_freq_min": round((cpu_freq.min or 0) / 1000, 2) if cpu_freq else None,
        "cpu_freq_max": round((cpu_freq.max or 0) / 1000, 2) if cpu_freq else None,
        "memory": {
            "total": round(vm.total / (1024 ** 3), 2),
            "available": round(vm.available / (1024 ** 3), 2),
            "used": round(vm.used / (1024 ** 3), 2),
            "percent": vm.percent,
        },
        "boot_time": datetime.fromtimestamp(boot_ts).isoformat(),
        "uptime_seconds": int(datetime.now().timestamp() - boot_ts),
        "load_1": round(load_1, 2),
        "load_5": round(load_5, 2),
        "load_15": round(load_15, 2),
    }
