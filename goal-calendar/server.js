const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3002;
const root = __dirname;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

function fetchWttr(location) {
  return new Promise((resolve, reject) => {
    https.get(`https://wttr.in/${encodeURIComponent(location)}?format=j1`, {
      headers: { 'User-Agent': 'OpenClaw Goal Calendar' }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const current = json.current_condition?.[0] || {};
          const forecast = (json.weather || []).slice(0, 3).map((day, index) => ({
            label: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
            max: day.maxtempF || day.maxtempC,
            min: day.mintempF || day.mintempC,
            icon: day.hourly?.[4]?.weatherDesc?.[0]?.value?.includes('Sunny') ? '☀️' : day.hourly?.[4]?.chanceofrain > 40 ? '🌧️' : '⛅',
          }));
          resolve({
            name: current.localObsDateTime ? location : location,
            temp: current.temp_F || current.temp_C || '--',
            feelsLike: current.FeelsLikeF || current.FeelsLikeC || '--',
            humidity: current.humidity || '--',
            wind: current.windspeedMiles ? `${current.windspeedMiles} mph` : `${current.windspeedKmph || '--'} km/h`,
            desc: current.weatherDesc?.[0]?.value || 'Unknown',
            icon: current.weatherDesc?.[0]?.value?.includes('Sunny') ? '☀️' : current.weatherDesc?.[0]?.value?.includes('Rain') ? '🌧️' : '⛅',
            forecast,
          });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/weather')) {
    try {
      const locations = await Promise.all([
        fetchWttr('32082'),
        fetchWttr('San Diego')
      ]);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ locations }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ error: 'Weather fetch failed' }));
    }
  }

  const urlPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(root, urlPath.split('?')[0]);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not found');
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Goal Calendar running at http://0.0.0.0:${PORT}`);
});
