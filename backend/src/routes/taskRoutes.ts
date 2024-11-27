import express, { Request, Response } from 'express';
const router = express.Router();
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';

router.get('/', authMiddleware, (req: Request, res: Response) => getTasks(req, res));
router.post('/', authMiddleware, (req: Request, res: Response) => createTask(req, res));
router.put('/:id', authMiddleware, (req: Request, res: Response) => updateTask(req, res));
router.delete('/:id', authMiddleware, (req: Request, res: Response) => deleteTask(req, res));

export default router;
