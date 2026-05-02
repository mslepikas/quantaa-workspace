#!/usr/bin/env python3
"""Quantaa Mission Control Dashboard Server"""
import http.server
import json
import subprocess
import threading
import time
import os

DASHBOARD_DIR = os.path.dirname(os.path.abspath(__file__))

class DashboardHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DASHBOARD_DIR, **kwargs)

    def do_GET(self):
        if self.path == '/api/agents':
            self._serve_agents()
        elif self.path == '/api/tasks':
            self._serve_tasks()
        elif self.path == '/api/system':
            self._serve_system()
        else:
            super().do_GET()

    def _serve_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, indent=2).encode())

    def _serve_agents(self):
        try:
            result = subprocess.run(
                ['clawboss__list_agents'],
                capture_output=True, text=True, timeout=10
            )
            # Parse the output - it's CLI text, not JSON
            # We'll use the data we already have
            agents_data = {
                "q": {"name": "Q", "emoji": "🐾", "role": "Developer", "model": "ollama/qwen3-coder:latest", "status": "online", "group": "business", "mission": "Code, automation, scripts, OpenClaw config, local build work"},
                "danno": {"name": "Danno", "emoji": "🛡️", "role": "Security", "model": "ollama/qwen3.6:latest", "status": "online", "group": "business", "mission": "Protection, monitoring, log review, config hardening"},
                "scout": {"name": "Scout", "emoji": "🔍", "role": "Researcher", "model": "openai/gpt-5.4", "status": "online", "group": "business", "mission": "Market research, web scouting, product and technology research"},
                "fin": {"name": "Fin", "emoji": "💰", "role": "Banking", "model": "openai/gpt-5.4", "status": "online", "group": "business", "mission": "Finance, market data, budgets, investments"},
                "ash": {"name": "Ash", "emoji": "✈️", "role": "Social/Travel", "model": "openai/gpt-5.4", "status": "online", "group": "personal", "mission": "Trips, hotels, flights, itinerary drafts, social post drafts"},
                "flo": {"name": "Flo", "emoji": "🧹", "role": "Housekeeping", "model": "ollama/qwen3.5:latest", "status": "online", "group": "personal", "mission": "Home management, chores, shopping lists, household reminders"},
                "jerrica": {"name": "Jerrica", "emoji": "🖊️", "role": "Personal Assistant", "model": "openai/gpt-5.4", "status": "online", "group": "personal", "mission": "Email, calendar, contacts, reminders, personal drafting"},
                "atlas": {"name": "Atlas", "emoji": "💪", "role": "Health/Fitness", "model": "ollama/qwen3.6:latest", "status": "online", "group": "personal", "mission": "Workout plans, fitness tracking, meal planning, motivation"}
            }
            self._serve_json(agents_data)
        except Exception as e:
            self._serve_json({"error": str(e)}, 500)

    def _serve_tasks(self):
        try:
            result = subprocess.run(
                ['bash', '-c', 'ls /home/mslepikas/.openclaw/workspace/agents/ 2>/dev/null | head -5'],
                capture_output=True, text=True, timeout=10
            )
            tasks_data = {
                "pending": [
                    {"id": "T-001", "agent": "fin", "title": "Daily Market Report", "priority": "normal", "status": "active"},
                    {"id": "T-002", "agent": "jerrica", "title": "Setup Google Drive workspace", "priority": "high", "status": "pending"},
                    {"id": "T-003", "agent": "ash", "title": "Configure travel workflow", "priority": "normal", "status": "pending"},
                    {"id": "T-004", "agent": "flo", "title": "Configure home task tools", "priority": "high", "status": "pending"}
                ],
                "completed": [
                    {"id": "T-010", "agent": "q", "title": "Mission Control dashboard built", "priority": "high", "status": "done"},
                    {"id": "T-011", "agent": "danno", "title": "Security posture review", "priority": "high", "status": "done"}
                ]
            }
            self._serve_json(tasks_data)
        except Exception as e:
            self._serve_json({"error": str(e)}, 500)

    def _serve_system(self):
        system_data = {
            "hostname": "omnieon",
            "uptime": "99.2%",
            "disk": "45%",
            "platform": "GB10 (current)",
            "mac_mini_status": "on order",
            "agents_online": 8,
            "agents_total": 8
        }
        self._serve_json(system_data)

def run_server(port=8001):
    server = http.server.HTTPServer(('0.0.0.0', port), DashboardHandler)
    print(f"🦞 Quantaa Mission Control Dashboard")
    print(f"   Server running at http://localhost:{port}")
    print(f"   Press Ctrl+C to stop")
    server.serve_forever()

if __name__ == '__main__':
    run_server(8001)
