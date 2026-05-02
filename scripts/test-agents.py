#!/usr/bin/env python3
"""Test all OpenClaw agents with a hello message."""

import json
import subprocess
import time
import sys

AGENTS = ["q", "danno", "scout", "fin", "ash", "flo", "jerrica", "atlas"]
MESSAGE = "Hello! I'm your employee who is here to introduce myself. Please respond with a brief hello and tell me who you are and what you do."

def test_agent(agent_id: str) -> dict:
    """Spawn an agent and wait for its response."""
    print(f"\n▶️ Testing agent: {agent_id}")
    print("-" * 60)
    
    # Spawn the agent as a subagent
    cmd = [
        "openclaw", "agent",
        "--agent", agent_id,
        "--message", MESSAGE,
        "--json",
        "--timeout", "180"
    ]
    
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=180
        )
        
        # Parse the JSON output
        data = json.loads(result.stdout)
        
        # Navigate to the message field
        d = data.get('data', data)
        if isinstance(d, dict):
            d = d.get('data', d)
        if isinstance(d, dict):
            d = d.get('data', d)
        if isinstance(d, dict):
            message = d.get('finalAssistantVisibleText', d.get('finalAssistantRawText', ''))
        else:
            message = ''
        
        if message:
            # Extract emoji signature
            if '?' in message:
                sig = '?'
            elif '$' in message:
                sig = '$'
            elif '🔒' in message:
                sig = '🔒'
            elif '🧹' in message:
                sig = '🧹'
            elif '🌍' in message:
                sig = '🌍'
            elif '💁' in message:
                sig = '💁'
            elif '❤️' in message:
                sig = '❤️'
            elif '🏋️' in message:
                sig = '🏋️'
            elif '💵' in message:
                sig = '💵'
            elif '🔍' in message:
                sig = '🔍'
            elif '🐾' in message:
                sig = '🐾'
            elif '?' in message:
                sig = '?'
            elif '$' in message:
                sig = '$'
            elif '🔒' in message:
                sig = '🔒'
            elif '🧹' in message:
                sig = '🧹'
            elif '🌍' in message:
                sig = '🌍'
            elif '💁' in message:
                sig = '💁'
            elif '❤️' in message:
                sig = '❤️'
            elif '💵' in message:
                sig = '💵'
            elif '🔍' in message:
                sig = '🔍'
            elif '🐾' in message:
                sig = '🐾'
            else:
                sig = None
            print(f"✅ {agent_id.upper()}: {sig}")
            print(f"   {message[:300]}...")
            return True
        else:
            print(f"❌ {agent_id}: No message received")
            return False
            
    except subprocess.TimeoutExpired:
        print(f"⏱️ {agent_id}: Timeout after 180s")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ {agent_id}: JSON decode error - {e}")
        return False
    except Exception as e:
        print(f"❌ {agent_id}: Error - {e}")
        return False

def main():
    print("=" * 60)
    print("🦞 Testing all OpenClaw agents")
    print("=" * 60)
    print(f"\nTest message: {MESSAGE[:60]}...")
    
    results = []
    for agent in AGENTS:
        try:
            success = test_agent(agent)
            results.append((agent, success))
        except Exception as e:
            print(f"❌ {agent}: Exception - {e}")
            results.append((agent, False))
    
    print("\n" + "=" * 60)
    print("Test Results")
    print("=" * 60)
    
    for agent, success in results:
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status:8} | {agent:10}")
    
    passed = sum(1 for _, s in results if s)
    total = len(results)
    print(f"\n{passed}/{total} agents passed")
    
    return 0 if passed == total else 1

if __name__ == "__main__":
    sys.exit(main())
