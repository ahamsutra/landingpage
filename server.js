import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static assets from root directory
app.use(express.static(__dirname));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Live interest store in-memory (and per IP/client)
const eventInterests = {
  1: {
    count: 0,
    voters: new Set()
  }
};

// API: Get live interest count
app.get('/api/events/:id/interest', (req, res) => {
  const eventId = req.params.id;
  const ip = req.ip || req.headers['x-forwarded-for'] || 'client';
  const data = eventInterests[eventId] || { count: 0, voters: new Set() };
  const userInterested = data.voters.has(ip);
  res.json({ eventId, interests: data.count, userInterested });
});

// API: Toggle live interest
app.post('/api/events/:id/interest/toggle', (req, res) => {
  const eventId = req.params.id;
  const ip = req.ip || req.headers['x-forwarded-for'] || 'client';
  if (!eventInterests[eventId]) {
    eventInterests[eventId] = { count: 0, voters: new Set() };
  }
  const data = eventInterests[eventId];
  let userInterested = false;
  if (data.voters.has(ip)) {
    data.voters.delete(ip);
    data.count = Math.max(0, data.count - 1);
    userInterested = false;
  } else {
    data.voters.add(ip);
    data.count += 1;
    userInterested = true;
  }
  res.json({ eventId, interests: data.count, userInterested });
});

// Projects page route
app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'projects.html'));
});

// Event Details page route
app.get('/event-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'event-details.html'));
});

// Fallback to index.html for SPA/root navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Ahamsutra server running at http://0.0.0.0:${PORT}`);
});
