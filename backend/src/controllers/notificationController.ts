import { Request, Response } from 'express';
import Notification from '../models/notification'; // Assuming Notification is a TypeScript model

// Obtenir les notifications
export const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.find({ user: req.user?.id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Marquer une notification comme lue
export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);
    if (!notification || notification.user.toString() !== req.user?.id) {
      res.status(403).json({ message: 'Non autorisé.' });
      return;
    }

    notification.isRead = true;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
