import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db';
import { setupRoutes } from './src/routes/appRoutes';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

setupRoutes(app);

app.get('/', (req, res) => {
  res.send('✅ API EventSync is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running at http://localhost:${PORT} 🪐`));
