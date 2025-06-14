import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import scoreRoutes from './routes/scores.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Autorise le domaine Vercel à communiquer avec Railway
app.use(cors({
  origin: [
    'https://wab-one.vercel.app',                           // <== C'EST CELLE-CI QUI DOIT TOUJOURS ÊTRE LÀ !
    'https://wab-kv1zm7dix-guillaumes-projects-f0ad4b84.vercel.app', // <== Celle-ci est pour les déploiements de prévisualisation si vous les utilisez
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174' // <-- Ajoutez cette ligne !
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
  credentials: true
}));

// ✅ Pour lire les requêtes JSON
app.use(express.json());

// ✅ Routes de scores
app.use('/', scoreRoutes);

// ✅ Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});