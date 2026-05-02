import psutil


def get_network_info():
    interfaces = []
    pernic = psutil.net_io_counters(pernic=True)
    stats = psutil.net_if_stats()
    addrs = psutil.net_if_addrs()

    for name, io in pernic.items():
        ipv4 = None
        for addr in addrs.get(name, []):
            if getattr(addr.family, 'name', str(addr.family)) == 'AF_INET':
                ipv4 = addr.address
                break
        interface_stats = stats.get(name)
        interfaces.append({
            "name": name,
            "is_up": interface_stats.isup if interface_stats else None,
            "speed": interface_stats.speed if interface_stats else None,
            "mtu": interface_stats.mtu if interface_stats else None,
            "ipv4": ipv4,
            "bytes_sent": round(io.bytes_sent / (1024 ** 2), 2),
            "bytes_recv": round(io.bytes_recv / (1024 ** 2), 2),
            "packets_sent": io.packets_sent,
            "packets_recv": io.packets_recv,
            "errors_in": io.errin,
            "errors_out": io.errout,
            "drop_in": io.dropin,
            "drop_out": io.dropout,
        })

    return {"interfaces": interfaces, "count": len(interfaces)}
