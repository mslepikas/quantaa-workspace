import psutil


def get_cpu_info():
    cpu_percent = psutil.cpu_percent(percpu=True, interval=0.1)
    cpu_freq = psutil.cpu_freq()

    cpu_info = []
    for i, percent in enumerate(cpu_percent):
        cpu_info.append({
            "cpu": i,
            "percent": percent,
            "freq_current": round((cpu_freq.current or 0) / 1000, 2) if cpu_freq else None,
            "freq_min": round((cpu_freq.min or 0) / 1000, 2) if cpu_freq else None,
            "freq_max": round((cpu_freq.max or 0) / 1000, 2) if cpu_freq else None,
        })

    return {
        "cpu": cpu_info,
        "count": len(cpu_info),
        "total_percent": psutil.cpu_percent(interval=0.1),
    }
