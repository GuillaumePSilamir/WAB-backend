const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS
app.use(cors({
  origin: 'https://wab-one.vercel.app', // 👈 autorise uniquement ton domaine Vercel
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));

app.use(bodyParser.json());

// Exemple de données en mémoire (à remplacer plus tard par une BDD)
let scores = [];

// GET /scores
app.get('/scores', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'SilamirCD2025!') {
    return res.status(403).json({ message: 'Clé API invalide' });
  }
  res.json(scores);
});

// POST /submit-score
app.post('/submit-score', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'SilamirCD2025!') {
    return res.status(403).json({ message: 'Clé API invalide' });
  }

  const { name, email, score, date } = req.body;

  if (!name || !email || score == null || !date) {
    return res.status(400).json({ message:
