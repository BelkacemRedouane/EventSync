import express, { Request, Response } from 'express';
const router = express.Router();
import { registerUser, loginUser, getProfile } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', authMiddleware, getProfile);

export default router;
