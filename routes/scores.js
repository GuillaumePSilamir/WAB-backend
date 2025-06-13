import express from 'express';
const router = express.Router();

const API_KEY = process.env.API_KEY;

let scores = [];

router.get('/scores', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Clé API invalide' });
  }
  res.json(scores);
});

router.post('/submit-score', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
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

export default router;
