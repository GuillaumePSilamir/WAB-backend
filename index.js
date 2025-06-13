import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import scoreRoutes from './routes/scores.js';



const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Autorise le domaine Vercel à communiquer avec Railway
app.use(cors({
  origin: 'https://wab-one.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));

// ✅ Pour lire les requêtes JSON
app.use(express.json());

// ✅ Routes de scores
app.use('/', scoreRoutes);

// ✅ Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
