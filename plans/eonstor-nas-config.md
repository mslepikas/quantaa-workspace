# Eonstor NAS Configuration

> **Date:** 2026-05-02
> **Type:** Network-Attached Storage (NAS)
> **Model:** Ugreen Eonstor (UGOS Pro 1.14.0.76802)
> **Location:** Home network

## Connection Details

- **IP:** 10.10.30.156
- **Username:** angus
- **Password:** Temporary-Danno!
- **Protocol:** SMB/CIFS
- **SSH:** Not enabled
- **Anonymous Access:** Denied

## Shares

| Share | Type | Purpose |
|-------|------|---------|
| openclaw | Disk | OpenClaw agent files and storage |
| models | Disk | Model weights and ML assets |

## Directory Structure on openclaw Share

```
/openclaw/
├── agents/
│   ├── q/          (Developer 🐾)
│   ├── danno/      (Security 🛡️)
│   ├── scout/      (Researcher 🔍)
│   ├── fin/        (Banking 💰)
│   ├── atlas/      (Health & Fitness 💪)
│   ├── jerrica/    (Personal Assistant 🖊️)
│   ├── ash/        (Social/Travel ✈️)
│   └── flo/        (Housekeeping 🧹)
└── backup/
    ├── daily/
    ├── weekly/
    └── monthly/
```

## Mount Script (run on GB10)

```bash
#!/bin/bash
# Mount Eonstor NAS shares
sudo mkdir -p /mnt/eonstor/openclaw /mnt/eonstor/models

# Mount openclaw share
sudo mount -t cifs //10.10.30.156/openclaw /mnt/eonstor/openclaw \
  -o username=angus,password=Temporary-Danno!,rw,vers=3.0,uid=$(id -u),gid=$(id -g)

# Mount models share
sudo mount -t cifs //10.10.30.156/models /mnt/eonstor/models \
  -o username=angus,password=Temporary-Danno!,rw,vers=3.0,uid=$(id -u),gid=$(id -g)

echo "Eonstor NAS mounted successfully!"
```

## Storage

- **Total:** ~11.6 TB available
- **Architecture:** ARM64 compatible

## Notes

- SMB1 is disabled on NAS
- No SSH access available
- Web UI at http://10.10.30.156
- Mount script saved at: `plans/eonstor-mount.sh`
