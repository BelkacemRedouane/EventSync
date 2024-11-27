const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
} = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Récupérer toutes les notifications de l'utilisateur
router.get('/', authMiddleware, getNotifications);

// Marquer une notification comme lue
router.put('/:id/read', authMiddleware, markAsRead);

module.exports = router;
