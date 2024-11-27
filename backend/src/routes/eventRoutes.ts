import express, { Request, Response } from 'express';
const router = express.Router();
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventController';
import authMiddleware from '../middleware/authMiddleware';

router.get('/', authMiddleware, (req: Request, res: Response) => getEvents(req, res));
router.post('/', authMiddleware, (req: Request, res: Response) => createEvent(req, res));
router.put('/:id', authMiddleware, (req: Request, res: Response) => updateEvent(req, res));
router.delete('/:id', authMiddleware, (req: Request, res: Response) => deleteEvent(req, res));

export default router;
