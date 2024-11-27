import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db';
import authRoutes from './src/routes/authRoutes';
import taskRoutes from './src/routes/taskRoutes';
import eventRoutes from './src/routes/eventRoutes';
import notificationRoutes from './src/routes/notificationRoutes';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
  res.send('✅ API EventSync is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running at http://localhost:${PORT} 🪐`));
