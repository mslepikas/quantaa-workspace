import subprocess

def get_temperature():
    """Get system temperatures from lm-sensors"""
    try:
        result = subprocess.run(['sensors', '-A'], capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            lines = result.stdout.split('\n')
            temps = {}
            for line in lines:
                if line and ':' in line and '°C' in line:
                    parts = line.split(':')
                    if len(parts) >= 2:
                        sensor_name = parts[0].strip()
                        try:
                            temp = float(parts[1].strip().replace('°C', '').replace('°', ''))
                            temps[sensor_name] = temp
                        except ValueError:
                            pass
            return {"sensors": temps, "count": len(temps)}
        else:
            return {"error": f"sensors command failed: {result.stderr.strip()}", "count": 0}
    except FileNotFoundError:
        return {"error": "lm-sensors not installed. Install with: sudo apt install lm-sensors", "count": 0}
    except subprocess.TimeoutExpired:
        return {"error": "sensors command timed out", "count": 0}
