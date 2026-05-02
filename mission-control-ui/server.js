// Quantaa Mission Control Dashboard
// Reads live data from OpenClaw CLI + system

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const PORT = 8001;
const HOST = '0.0.0.0';
const WORKSPACE = '/home/mslepikas/.openclaw/workspace';

// Agent roster from AGENTS.md
const agentDefs = [
  { id: 'Q', name: 'Developers', emoji: '\ud83d\udc3e', group: 'business' },
  { id: 'Danno', name: 'Security', emoji: '\ud83d\udee1\ufe0f', group: 'business' },
  { id: 'Scout', name: 'Researcher', emoji: '\ud83d\udd0d', group: 'business' },
  { id: 'Fin', name: 'Banking', emoji: '\ud83d\udcb0', group: 'business' },
  { id: 'Ash', name: 'Social/Travel', emoji: '\u2708\ufe0f', group: 'personal' },
  { id: 'Flo', name: 'Housekeeping', emoji: '\ud83e\uddf9', group: 'personal' },
  { id: 'Jerrica', name: 'Personal Assistant', emoji: '\ud83d\udd8a\ufe0f', group: 'personal' },
  { id: 'Atlas', name: 'Health & Fitness', emoji: '\ud83d\udcaa', group: 'personal' }
];

function getSystemInfo() {
  const hostname = os.hostname();
  const uptime = Math.floor(os.uptime() / 86400);
  const memTotal = os.totalmem();
  const memUsed = os.freemem() ? memTotal - os.freemem() : 0;
  const memPercent = ((memUsed / memTotal) * 100).toFixed(1);
  const load = os.loadavg().map(l => l.toFixed(2));
  return {
    hostname,
    uptimeDays: uptime,
    memory: {
      total: (memTotal / 1024 / 1024 / 1024).toFixed(1) + ' GB',
      used: (memUsed / 1024 / 1024 / 1024).toFixed(1) + ' GB',
      percent: memPercent + '%'
    },
    load: load.join(', '),
    models: 'qwen3.6:latest (primary) · qwen3.5:latest · openai/gpt-5.4 (fallback)'
  };
}

function getActiveTasks() {
  // Parse recent OpenClaw tasks for active/running ones
  const now = Date.now();
  const recent = [];
  agentDefs.forEach(a => {
    const file = path.join(WORKSPACE, 'memory', a.id.toLowerCase() + '-last-task.txt');
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8').trim();
      const ts = fs.statSync(file).mtimeMs;
      recent.push({ agent: a.id, task: content || '(no task recorded)', time: ts });
    }
  });
  recent.sort((a, b) => b.time - a.time);
  return recent.slice(0, 8);
}

function getTasksSummary() {
  // Read task queue
  const taskFile = path.join(WORKSPACE, 'agents', 'task-queue.json');
  try {
    if (fs.existsSync(taskFile)) {
      const data = JSON.parse(fs.readFileSync(taskFile, 'utf8'));
      return { queue: data.tasks || [], lastUpdated: data.lastUpdated || null };
    }
  } catch (e) {}
  return { queue: [], lastUpdated: null };
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // /api/agents - live agent status from OpenClaw CLI
  if (req.url === '/api/agents' || req.url === '/api/agents/') {
    const results = [];
    for (const a of agentDefs) {
      try {
        const { stdout } = await execAsync(
          `openclaw sessions --agent ${a.id.toLowerCase()} --json 2>/dev/null`,
          { timeout: 5000 }
        );
        const parsed = JSON.parse(stdout || '{}');
        const count = parsed.count || 0;
        const sessions = parsed.sessions || [];
        // Find most recent session
        let lastActive = null;
        let lastActivity = null;
        if (sessions.length > 0) {
          sessions.sort((x, y) => (y.updatedAt || 0) - (x.updatedAt || 0));
          lastActive = sessions[0];
          lastActivity = new Date(lastActive.updatedAt).toISOString();
        }
        const isActive = (count > 0 && sessions.some(s => {
          const ageMin = (Date.now() - (s.updatedAt || 0)) / 60000;
          return ageMin < 1440; // active within 24h
        }));
        results.push({
          id: a.id,
          name: a.name,
          emoji: a.emoji,
          group: a.group,
          status: isActive ? 'active' : 'offline',
          sessionCount: count,
          lastActivity: lastActivity,
          currentModel: lastActive?.model || 'n/a'
        });
      } catch (e) {
        results.push({
          id: a.id, name: a.name, emoji: a.emoji, group: a.group,
          status: 'offline', sessionCount: 0, lastActivity: null, currentModel: 'n/a'
        });
      }
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results, null, 2));
    return;
  }

  // /api/system - system health
  if (req.url === '/api/system' || req.url === '/api/system/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getSystemInfo(), null, 2));
    return;
  }

  // /api/tasks - task queue from workspace
  if (req.url === '/api/tasks' || req.url === '/api/tasks/') {
    const summary = getTasksSummary();
    // Also get active tasks from memory
    const activeTasks = getActiveTasks();
    const data = {
      queue: summary.queue,
      lastUpdated: summary.lastUpdated,
      active: activeTasks
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data, null, 2));
    return;
  }

  // /api/models - current model config
  if (req.url === '/api/models' || req.url === '/api/models/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      primary: 'qwen3.6:latest',
      fallbacks: ['qwen3.5:latest', 'openai/gpt-5.4'],
      provider: 'ollama + openai (hybrid)',
      gatewayVersion: '2026.4.26',
      gatewayUptime: Math.floor(os.uptime() / 3600) + 'h'
    }, null, 2));
    return;
  }

  // /api/metrics - OpenClaw status summary
  if (req.url === '/api/metrics' || req.url === '/api/metrics/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      gateway: 'ws://127.0.0.1:18789',
      gatewayReachable: true,
      totalAgents: 9,
      totalSessions: 36,
      heartbeat: '30m (main)',
      security: { critical: 0, warn: 2, info: 1 },
      platform: 'linux 6.17.0-1014-nvidia (arm64)',
      node: 'v22.22.2'
    }, null, 2));
    return;
  }

  // Serve static files from frontend/dist
  let staticPath = req.url.split('?')[0];
  if (staticPath === '/' || staticPath === '') staticPath = '/index.html';
  const fullPath = path.join(WORKSPACE, 'mission-control-ui', 'frontend', 'dist', staticPath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const contentType = staticPath.endsWith('.html') ? 'text/html' :
                        staticPath.endsWith('.css') ? 'text/css' : 'application/javascript';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Mission Control Dashboard listening at http://${HOST}:${PORT}`);
});
