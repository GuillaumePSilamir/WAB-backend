import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Middleware de sécurité : vérifie la clé API
router.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Clé API invalide' });
  }
  next();
});

// Route GET pour récupérer les meilleurs scores
router.get('/scores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM scores ORDER BY score DESC LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Erreur GET /scores :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route POST pour enregistrer un nouveau score
router.post('/submit-score', async (req, res) => {
  const { name, email, score, date } = req.body;

  if (!name || !email || score == null || !date) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO scores (name, email, score, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, score, date]
    );
    res.json({ message: 'Score enregistré', score: result.rows[0] });
  } catch (err) {
    console.error('❌ Erreur POST /submit-score :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
