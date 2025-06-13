import cors from 'cors'; // ou const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'https://wab-one.vercel.app', // 👈 autorise ton domaine Vercel
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));
