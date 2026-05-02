# Central Control Plan for Quantaa 🦞

## Vision
Build a unified agent coordination layer that lets Angus manage all 8 agents from one interface — task routing, status monitoring, weekly automation, and cross-agent collaboration.

### Infrastructure Reality
- **All 8 agents + main (Angus) currently run on GB10** — 128GB unified memory
- **Mac Mini on order** — planned migration for personal agents later
- **All files/data stay on GB10** until Mac Mini arrives and migration is complete

## Architecture

```
┌─────┐
│ Mark│ (CEO)
└──┬──┘
   │
┌──┴──────┐
│ Angus   │ (CoS + Central Control)
└──┬──────┘
   │
┌──┴─────────────────┐
│   GB10 (CURRENT)   │  ← Everything lives here now
│                    │
│  ┌──────────┐ ┌────┴────┐
│  │ Business │ │Personal │
│  │  Group   │ │  Group  │
│  │ Q,Danno  │ │Ash,Flo  │
│  │Scout,Fin │ │Jerrica, │
│  └──────────┘ │ Atlas   │
│               └─────────┘
└────┬──────┬───┘
     │      │
     ▼      ▼
┌──────────┐ ┌──────────┐
│    Q     │ │ Central  │
│  (Router)│ │ Control  │
│          │ │  Layer   │
└──────────┘ └──────────┘

┌───────────────────────────┐
│   Mac Mini (PLANNED)      │
│   Personal agents migrate │
│   Business stays on GB10  │
└───────────────────────────┘
```

## Phase 1: Foundation (✅ Complete)
- [x] Register all 8 agents in openclaw.json
- [x] Initialize memory directories for all agents
- [x] Create coordination.json (shared state file)

## Phase 2: Central Control (🔧 In Progress)
- [x] **coordination.json created** — all 8 agents registered with platform info
- [ ] **Task Queue System** — Central queue in `agents/task-queue.json`
  - Pending/completed tasks
  - Task routing rules
  - Priority levels (urgent/high/normal/low)
  
- [ ] **Status Dashboard** — Real-time agent health monitoring
  - `agents/agent-status.json` (heartbeat, uptime, last task)
  - `agents/status-display.md` (human-readable overview)
  - Automated status checks via cron
  
- [ ] **Cross-Agent Messaging** — Agents can communicate
  - Shared inbox via `agents/inbox/`
  - Task handoff protocol
  - Status broadcasts

## Phase 3: Sunday Automation (📅 To Define)
- [ ] **Weekly Business Sweep** (Scout + Fin)
  - Scout: Market trends, AI news, competitor updates
  - Fin: Portfolio review, financial summary
  - Q: System health check, agent status report
  
- [ ] **Weekly Personal Sweep** (Ash + Jerrica + Atlas + Flo)
  - Ash: Travel planning, social engagement
  - Jerrica: Calendar review, next week prep
  - Atlas: Fitness progress, workout adjustments
  - Flo: Household inventory, supply needs

## Phase 4: Agent Autonomy (🤖 Future)
- [ ] **Auto-routing** — Natural language to agent dispatch
  - "Q, deploy the staging server" → Q gets the task
  - "What's the market doing?" → Scout researches
  
- [ ] **Agent-to-Agent Workflows**
  - Q builds → Danno audits → Scout researches → Fin evaluates
  
- [ ] **Decision Hierarchy**
  - Q: Technical decisions (with Danno security veto)
  - Scout: Research recommendations
  - Fin: Financial thresholds for approval
  - Danno: Security decisions (absolute authority)

## Phase 5: Mac Mini Migration (📦 Planned)
- [ ] Mac Mini arrives and boots
- [ ] Create agent directories on Mac Mini
  - `~/.openclaw/agents/{ash,flo,jerrica,atlas}/` 
  - Copy SOUL.md, MEMORY.md, memory/ dirs
- [ ] Update agents.json to reflect platform split:
  ```json
  "business": "GB10",  // Q, Danno, Scout, Fin
  "personal": "Mac Mini", // Ash, Flo, Jerrica, Atlas
  ```
- [ ] Set up cross-machine sync for shared files
  - Workspace files stay on GB10 (shared state)
  - Personal data stays on Mac Mini (privacy)
  - Task queue and coordination.json synced via Git or rsync
- [ ] Test agent spawning from GB10 to Mac Mini
- [ ] Decommission personal agent registrations from GB10

## Task Queue Schema
```json
{
  "version": "1.0",
  "tasks": [
    {
      "id": "task-001",
      "agent": "scout",
      "group": "business",
      "task": "Research latest AI deployment frameworks",
      "priority": "normal",
      "status": "pending",
      "created": "2026-04-28T22:00:00-04:00",
      "completed": null,
      "notes": ""
    }
  ]
}
```

## Status Display Schema
```markdown
# Agent Status Dashboard
_Last updated: 2026-04-28 22:00 ET_

## Business Group (GB10)
- [✅ Online] Q - Developer + Command Center
- [✅ Online] Danno - Security
- [✅ Online] Scout - Research
- [✅ Online] Fin - Banking

## Personal Group (GB10 → Mac Mini pending)
- [✅ Online] Ash - Social/Travel
- [✅ Online] Flo - Housekeeping/Shopping
- [✅ Online] Jerrica - Personal Assistant
- [✅ Online] Atlas - Health/Fitness

## Active Tasks
- Task #1: Research AI frameworks (Scout) - 30%

## Health
- Uptime: 99.2%
- Last gateway restart: 2h ago
- Disk: 45% used

## Migration Status
- Mac Mini: on order — pending arrival
- Personal agents: running on GB10, migrate later
- Shared state files: all on GB10 (GB10 is the single source of truth)
```

## Next Steps
1. Build task queue system
2. Create auto-routing from Q's SOUL.md capabilities
3. Define Sunday automation payload
4. Build agent monitoring script
5. Create cross-agent message protocol

## Open Questions
1. What should Sunday automation actually do?
2. Agent-to-agent communication through Angus/Q or direct?
3. Agent auto-escalation or self-resolution?
4. Mac Mini delivery timeline?
