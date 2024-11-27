const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Récupérer toutes les tâches de l'utilisateur
router.get('/', authMiddleware, getTasks);

// Créer une tâche
router.post('/', authMiddleware, createTask);

// Mettre à jour une tâche
router.put('/:id', authMiddleware, updateTask);

// Supprimer une tâche
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
