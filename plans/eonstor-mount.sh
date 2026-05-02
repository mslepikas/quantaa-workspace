#!/bin/bash
# Mount Eonstor NAS shares
# NAS: 10.10.30.156
# User: angus
# Password: Temporary-Danno!

sudo mkdir -p /mnt/eonstor/openclaw /mnt/eonstor/models

# Mount openclaw share
sudo mount -t cifs //10.10.30.156/openclaw /mnt/eonstor/openclaw \
  -o username=angus,password=Temporary-Danno!,rw,vers=3.0,uid=$(id -u),gid=$(id -g)

# Mount models share
sudo mount -t cifs //10.10.30.156/models /mnt/eonstor/models \
  -o username=angus,password=Temporary-Danno!,rw,vers=3.0,uid=$(id -u),gid=$(id -g)

echo "Eonstor NAS mounted successfully!"
