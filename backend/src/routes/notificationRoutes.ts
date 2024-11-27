import express, { Request, Response } from 'express';
const router = express.Router(); 
import { getNotifications, markAsRead } from '../controllers/notificationController';
import authMiddleware from '../middleware/authMiddleware';

router.get('/', authMiddleware, (req: Request, res: Response) => getNotifications(req, res));
router.put('/:id/read', authMiddleware, (req: Request, res: Response) => markAsRead(req, res));

export default router;
