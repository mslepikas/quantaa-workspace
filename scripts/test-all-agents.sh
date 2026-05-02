#!/bin/bash
# Test all agents via openclaw CLI
# Each agent gets: "Hello! I'm your employee who is here to introduce myself. Please respond with a brief hello and tell me who you are and what you do."

MESSAGE="Hello! I'm your employee who is here to introduce myself. Please respond with a brief hello and tell me who you are and what you do."
TIMEOUT=90

agents=("q" "danno" "scout" "fin" "ash" "flo" "jerrica" "atlas")

echo "🦞 Testing all agents..."
echo "======================================"
echo ""

for agent in "${agents[@]}"; do
    echo "▶️ Testing: $agent"
    echo "--------------------------------------"
    
    # Run the agent and extract the message using python
    openclaw agent \
        --agent "$agent" \
        --message "$MESSAGE" \
        --timeout $TIMEOUT \
        --json 2>&1 | python3 -c "
import sys, json
data = json.load(sys.stdin)

# Navigate: data -> data -> data -> completion -> finalAssistantVisibleText
try:
    if 'data' in data:
        d = data['data']
        if isinstance(d, dict):
            d = d.get('data', d)
            if isinstance(d, dict):
                d = d.get('data', d)
    message = d.get('finalAssistantVisibleText', d.get('finalAssistantRawText', 'No message'))
    
    if isinstance(d, dict):
        provider = d.get('executionTrace', {}).get('winnerProvider', 'unknown') if 'executionTrace' in d else 'unknown'
        model = d.get('executionTrace', {}).get('winnerModel', 'unknown') if 'executionTrace' in d else 'unknown'
        if provider == 'unknown':
            for k,v in str(d).split():
                if 'winnerProvider' in k:
                    provider = v
    except:
        provider = model = message = 'Parse error'

print(f'   ✅ Status: OK')
print(f'   🧠 Provider: {provider}')
print(f'   🤖 Model: {model}')
print(f'   💬 Message: {message[:500]}')
" 2>/dev/null
    
    if [ $? -ne 0 ]; then
        echo "   ❌ Parse failed"
    fi
    
    echo ""
done

echo "======================================"
echo "✅ All agents tested."
