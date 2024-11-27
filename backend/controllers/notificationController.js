const Notification = require('../models/notification');

// Obtenir les notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Marquer une notification comme lue
exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);
    if (!notification || notification.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Non autorisé.' });
    }

    notification.isRead = true;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
