import psutil


def _gb(value):
    return round(value / (1024 ** 3), 2)


def get_memory_info():
    mem = psutil.virtual_memory()
    return {
        "total": _gb(mem.total),
        "available": _gb(mem.available),
        "percent": mem.percent,
        "used": _gb(mem.used),
        "free": _gb(mem.free),
        "buffers": _gb(getattr(mem, 'buffers', 0)),
        "cached": _gb(getattr(mem, 'cached', 0)),
        "active": _gb(getattr(mem, 'active', 0)),
        "inactive": _gb(getattr(mem, 'inactive', 0)),
        "slab": _gb(getattr(mem, 'slab', 0)),
    }
