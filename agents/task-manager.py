#!/usr/bin/env python3
"""
Simple task manager for Quantaa Mission Control
"""

import json
import datetime
import sys
from pathlib import Path

def load_task_queue():
    """Load the current task queue"""
    try:
        with open('agents/task-queue.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"version": "1.0", "lastUpdated": "", "tasks": [], "priorities": {}}

def save_task_queue(queue_data):
    """Save the task queue"""
    with open('agents/task-queue.json', 'w') as f:
        json.dump(queue_data, f, indent=2)

def create_task(agent, task_description, priority="normal"):
    """Create a new task"""
    queue = load_task_queue()
    
    new_task = {
        "id": f"task-{len(queue['tasks']) + 1:03d}",
        "agent": agent,
        "task": task_description,
        "priority": priority,
        "status": "pending",
        "created": datetime.datetime.now().isoformat(),
        "completed": None,
        "notes": ""
    }
    
    queue['tasks'].append(new_task)
    queue['lastUpdated'] = datetime.datetime.now().isoformat()
    
    save_task_queue(queue)
    print(f"Task created: {new_task['id']} for {agent}")
    return new_task

def list_pending_tasks():
    """List all pending tasks"""
    queue = load_task_queue()
    
    if not queue['tasks']:
        print("No pending tasks")
        return
    
    print("Pending Tasks:")
    print("-" * 50)
    for task in queue['tasks']:
        if task['status'] == 'pending':
            print(f"ID: {task['id']}")
            print(f"  Agent: {task['agent']}")
            print(f"  Task: {task['task']}")
            print(f"  Priority: {task['priority']}")
            print(f"  Created: {task['created']}")
            print()

def mark_task_complete(task_id):
    """Mark a task as complete"""
    queue = load_task_queue()
    
    for task in queue['tasks']:
        if task['id'] == task_id:
            task['status'] = 'completed'
            task['completed'] = datetime.datetime.now().isoformat()
            queue['lastUpdated'] = datetime.datetime.now().isoformat()
            save_task_queue(queue)
            print(f"Task {task_id} marked as complete")
            return True
    
    print(f"Task {task_id} not found")
    return False

def main():
    """Main function to handle command line arguments"""
    if len(sys.argv) < 2:
        print("Usage: python task-manager.py [command] [arguments]")
        print("Commands:")
        print("  create [agent] [description] [priority] - Create a new task")
        print("  list - List pending tasks")
        print("  complete [task_id] - Mark task as complete")
        return
    
    command = sys.argv[1]
    
    if command == "create":
        if len(sys.argv) < 4:
            print("Usage: python task-manager.py create [agent] [description] [priority]")
            return
        agent = sys.argv[2]
        description = sys.argv[3]
        priority = sys.argv[4] if len(sys.argv) > 4 else "normal"
        create_task(agent, description, priority)
    
    elif command == "list":
        list_pending_tasks()
    
    elif command == "complete":
        if len(sys.argv) < 3:
            print("Usage: python task-manager.py complete [task_id]")
            return
        task_id = sys.argv[2]
        mark_task_complete(task_id)
    
    else:
        print(f"Unknown command: {command}")

if __name__ == "__main__":
    main()