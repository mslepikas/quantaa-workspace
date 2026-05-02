#!/usr/bin/env python3
"""
Agent monitoring script for Quantaa Mission Control
"""

import json
import datetime
from pathlib import Path

def update_agent_status():
    """Update agent status in coordination file"""
    
    # Load coordination file
    with open('agents/coordination.json', 'r') as f:
        coordination = json.load(f)
    
    # Update timestamps for all agents
    current_time = datetime.datetime.now().isoformat()
    
    # Update business agents
    for agent_key in coordination['groups']['business']['agents']:
        coordination['groups']['business']['agents'][agent_key]['lastHeartbeat'] = current_time
    
    # Update personal agents
    for agent_key in coordination['groups']['personal']['agents']:
        coordination['groups']['personal']['agents'][agent_key]['lastHeartbeat'] = current_time
    
    # Save updated coordination file
    with open('agents/coordination.json', 'w') as f:
        json.dump(coordination, f, indent=2)
    
    print(f"Agent statuses updated: {current_time}")

if __name__ == "__main__":
    update_agent_status()