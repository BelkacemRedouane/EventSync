const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes d'authentification
router.post('/register', registerUser);
router.post('/login', loginUser);

// Route de profil (avec middleware)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
