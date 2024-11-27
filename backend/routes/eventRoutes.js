const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

// Récupérer tous les événements de l'utilisateur
router.get('/', authMiddleware, getEvents);

// Créer un événement
router.post('/', authMiddleware, createEvent);

// Mettre à jour un événement
router.put('/:id', authMiddleware, updateEvent);

// Supprimer un événement
router.delete('/:id', authMiddleware, deleteEvent);

module.exports = router;
