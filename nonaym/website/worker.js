// nonaym-lead-worker — receives lead form POST, writes to R2, serves admin page
const LEADS_FILE = 'leads.jsonl';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const ADMIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nonaym — Leads</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        :root { --bg: #0f1419; --card: #171c27; --border: #1f2838; --accent: #00b8d4; --text: #c8d0dc; --muted: #8090a8; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); padding: 20px; }
        .locked { display: flex; justify-content: center; align-items: center; height: 80vh; }
        .locked-inner { text-align: center; }
        .locked input { background: var(--card); border: 1px solid var(--border); color: var(--text); padding: 10px 14px; border-radius: 8px; font-size: 15px; margin-right: 8px; }
        .locked button { background: var(--accent); color: #0a1520; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 15px; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .header h1 { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; }
        .toolbar { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .toolbar input, .toolbar select { background: var(--card); border: 1px solid var(--border); color: var(--text); padding: 8px 12px; border-radius: 6px; font-size: 14px; }
        .toolbar input { flex: 1; min-width: 180px; }
        .toolbar button { background: var(--accent); color: #0a1520; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 14px; }
        .toolbar button:hover { opacity: 0.85; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--border); color: var(--muted); font-weight: 500; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        td { padding: 10px 12px; border-bottom: 1px solid var(--border); }
        tr:hover td { background: rgba(0, 184, 212, 0.03); }
        .tier-badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
        .tier-lite { background: rgba(0, 184, 212, 0.15); color: #00b8d4; }
        .tier-ai { background: rgba(165, 242, 10, 0.15); color: #A5F20A; }
        .count { color: var(--muted); font-size: 13px; }
        .empty { text-align: center; padding: 60px 20px; color: var(--muted); }
        .status { margin-top: 10px; font-size: 13px; }
        .status.error { color: #f87171; }
        .status.ok { color: #A5F20A; }
        @media (max-width: 768px) { table { font-size: 12px; } th, td { padding: 8px 6px; } }
    </style>
</head>
<body>
    <div id="lock-screen" class="locked">
        <div class="locked-inner">
            <h1 style="font-family:'Space Grotesk',sans-serif;font-size:2rem;margin-bottom:20px;">Nonaym Leads</h1>
            <input type="password" id="pw-input" placeholder="Enter admin password">
            <button onclick="doLogin()">Unlock</button>
            <div id="pw-status" class="status"></div>
        </div>
    </div>
    <div id="admin-panel" style="display:none;">
        <div class="header"><h1>Nonaym Leads</h1><span class="count" id="count">loading...</span></div>
        <div class="toolbar">
            <input type="text" id="search" placeholder="Search name, email, message...">
            <select id="tier-filter"><option value="">All Tiers</option><option value="Lite">Lite</option><option value="AI">AI</option></select>
            <button onclick="exportCSV()">Export CSV</button>
            <button onclick="refresh()">Refresh</button>
        </div>
        <div id="table-wrap"></div>
    </div>
    <script>
        let allLeads = [];
        let adminPW = '';
        const WORKER_URL = location.origin + '/';
        function doLogin() {
            adminPW = document.getElementById('pw-input').value;
            if (!adminPW) { return; }
            fetch(WORKER_URL + 'leads?password=' + encodeURIComponent(adminPW))
                .then(r => { if (r.ok) { document.getElementById('lock-screen').style.display='none'; document.getElementById('admin-panel').style.display='block'; refresh(); } else { document.getElementById('pw-status').textContent='Wrong password'; document.getElementById('pw-status').className='status error'; }})
                .catch(e => { document.getElementById('pw-status').textContent='Connection error'; document.getElementById('pw-status').className='status error'; });
        }
        async function fetchLeads() {
            const res = await fetch(WORKER_URL + 'leads?password=' + encodeURIComponent(adminPW));
            if (!res.ok) return [];
            return await res.json();
        }
        async function refresh() { allLeads = await fetchLeads(); render(allLeads); }
        function render(leads) {
            document.getElementById('count').textContent = leads.length + ' lead' + (leads.length !== 1 ? 's' : '');
            const wrap = document.getElementById('table-wrap');
            if (!leads.length) { wrap.innerHTML = '<div class="empty">No leads yet</div>'; return; }
            let html = '<table><thead><tr><th>Date</th><th>Tier</th><th>Name</th><th>Email</th><th>Phone</th><th>Message</th></tr></thead><tbody>';
            leads.forEach(l => {
                const tierClass = l.tier === 'AI' ? 'tier-ai' : 'tier-lite';
                const date = new Date(l.created).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
                html += '<tr><td>' + date + '</td><td><span class="tier-badge ' + tierClass + '">' + l.tier + '</span></td><td>' + esc(l.name) + '</td><td>' + esc(l.email) + '</td><td>' + esc(l.phone) + '</td><td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + esc(l.message) + '</td></tr>';
            });
            html += '</tbody></table>';
            wrap.innerHTML = html;
        }
        function esc(s) { if (!s) return ''; const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
        document.getElementById('search').addEventListener('input', filter);
        document.getElementById('tier-filter').addEventListener('change', filter);
        function filter() {
            const q = document.getElementById('search').value.toLowerCase();
            const tier = document.getElementById('tier-filter').value;
            let filtered = allLeads;
            if (tier) filtered = filtered.filter(l => l.tier === tier);
            if (q) filtered = filtered.filter(l => (l.name||'').toLowerCase().includes(q) || (l.email||'').toLowerCase().includes(q) || (l.message||'').toLowerCase().includes(q));
            render(filtered);
        }
        function exportCSV() {
            if (!allLeads.length) return;
            const headers = ['Date','Tier','Name','Email','Phone','Message'];
            const rows = allLeads.map(l => [new Date(l.created).toISOString(), l.tier, l.name, l.email, l.phone, l.message].map(v => '"' + (v||'').replace(/"/g, '""') + '"'));
            const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
            const a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
            a.download = 'nonaym-leads-' + new Date().toISOString().slice(0,10) + '.csv';
            a.click();
        }
        document.getElementById('pw-input').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
    </script>
</body>
</html>`;

async function getLeads(r2) {
  const obj = await r2.get(LEADS_FILE);
  if (!obj) return [];
  const text = await obj.text();
  return text.split('\n').filter(l => l.trim()).map(l => JSON.parse(l));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/lead') {
      // Handle CORS preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      const form = await request.formData();
      const lead = {
        id: crypto.randomUUID(),
        created: new Date().toISOString(),
        tier: form.get('tier') || 'unknown',
        name: form.get('name') || '',
        email: form.get('email') || '',
        phone: form.get('phone') || '',
        message: form.get('message') || '',
        ip: request.headers.get('CF-Connecting-IP') || 'unknown'
      };
      const r2 = env.NONAYM_LEADS;
      const current = await getLeads(r2);
      await r2.put(LEADS_FILE, current.map(l => JSON.stringify(l)).join('\n') + '\n' + JSON.stringify(lead));
      return new Response(JSON.stringify({ ok: true, id: lead.id }), {
        headers: { 'Content-Type': 'application/json', ...CORS }
      });
    }

    if (request.method === 'GET' && url.pathname === '/') {
      return new Response(ADMIN_HTML, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    if (request.method === 'GET' && url.pathname === '/leads') {
      // Handle CORS preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      const pw = url.searchParams.get('password') || request.headers.get('x-admin-password');
      if (pw !== env.ADMIN_PASSWORD) {
        return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
      }
      const r2 = env.NONAYM_LEADS;
      const leads = await getLeads(r2);
      return new Response(JSON.stringify(leads), {
        headers: { 'Content-Type': 'application/json', ...CORS }
      });
    }

    return new Response('not found', { status: 404, headers: CORS });
  }
};
