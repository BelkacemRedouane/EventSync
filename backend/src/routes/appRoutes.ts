import { Express } from 'express';
import authRoutes from './authRoutes';
import taskRoutes from './taskRoutes';
import eventRoutes from './eventRoutes';
import notificationRoutes from './notificationRoutes';

export const setupRoutes = (app: Express): void => {
  app.use('/api/auth', authRoutes);
  app.use('/api/tasks', taskRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/notifications', notificationRoutes);
}; 