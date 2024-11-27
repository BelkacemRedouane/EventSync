import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token manquant ou invalide.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { user: any }; // Add type assertion for decoded
    req.user = decoded.user; // Inject user information into req.user
    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du token :', error);
    res.status(403).json({ message: 'Token invalide.' });
    return;
  }
};

export default authMiddleware;

