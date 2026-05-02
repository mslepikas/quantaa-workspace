import subprocess


def _num(value):
    cleaned = value.strip().replace(' MiB', '').replace(' %', '').replace(' C', '').replace('[N/A]', '').replace('N/A', '')
    if not cleaned:
        return None
    try:
        return float(cleaned)
    except ValueError:
        return None


def get_gpu_info():
    try:
        result = subprocess.run(
            ['nvidia-smi', '--query-gpu=index,name,temperature.gpu,memory.total,memory.free,utilization.gpu,memory.used', '--format=csv,noheader,nounits'],
            capture_output=True,
            text=True,
            timeout=10,
        )
        if result.returncode != 0:
            return {"error": f"nvidia-smi command failed: {result.stderr.strip()}", "count": 0}

        gpu_list = []
        for line in result.stdout.strip().split('\n'):
            if not line.strip():
                continue
            parts = [p.strip() for p in line.split(',')]
            if len(parts) < 6:
                continue
            total = _num(parts[3])
            free = _num(parts[4])
            used = _num(parts[6]) if len(parts) > 6 else None
            gpu_list.append({
                "index": int(parts[0]),
                "name": parts[1],
                "temperature": _num(parts[2]),
                "memory_total": round((total or 0) / 1024, 2) if total is not None else None,
                "memory_free": round((free or 0) / 1024, 2) if free is not None else None,
                "memory_used": round((used or 0) / 1024, 2) if used is not None else None,
                "utilization": _num(parts[5]),
                "memory_used_percent": round(((used or 0) / total) * 100, 1) if total and used is not None else None,
            })

        return {"gpus": gpu_list, "count": len(gpu_list)}
    except FileNotFoundError:
        return {"error": "nvidia-smi not found (no NVIDIA GPU or driver)", "count": 0}
    except subprocess.TimeoutExpired:
        return {"error": "nvidia-smi command timed out", "count": 0}
    except Exception as e:
        return {"error": f"GPU monitoring unavailable: {str(e)}", "count": 0}
