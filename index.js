const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://wab-one.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));

app.use(bodyParser.json());

let scores = [];

app.get('/scores', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'SilamirCD2025!') {
    return res.status(403).json({ message: 'Clé API invalide' });
  }
  res.json(scores);
});

app.post('/submit-score', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'SilamirCD2025!') {
    return res.status(403).json({ message: 'Clé API invalide' });
  }

  const { name, email, score, date } = req.body;
  if (!name || !email || score == null || !date) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  const newScore = { name, email, score, date, id: Date.now() };
  scores.push(newScore);
  res.json({ message: 'Score enregistré', score: newScore });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
