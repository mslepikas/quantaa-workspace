import psutil
import os

def get_top_processes(limit=10):
    """Get top processes by CPU and memory usage"""
    process_list = []
    
    try:
        for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent', 'username', 'status']):
            try:
                process_list.append({
                    "pid": proc.info['pid'],
                    "name": proc.info['name'],
                    "cpu_percent": proc.info['cpu_percent'],
                    "memory_percent": proc.info['memory_percent'],
                    "username": proc.info['username'],
                    "status": proc.info['status'],
                    "cmdline": ' '.join(proc.info.get('cmdline', []))[:100] if proc.info.get('cmdline') else None,
                })
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue
    except Exception as e:
        return {"error": f"Process monitoring unavailable: {str(e)}"}
    
    # Sort by CPU usage
    process_list.sort(key=lambda x: x['cpu_percent'], reverse=True)
    
    return {
        "processes": process_list[:limit],
        "count": len(process_list),
        "total_cpu": sum(p['cpu_percent'] for p in process_list) / 100 if process_list else 0,
        "total_memory": sum(p['memory_percent'] for p in process_list) / 100 if process_list else 0,
    }
