const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para login
router.post('/login', authController.login);

// Exporte o router para que ele possa ser usado em `server.js`
module.exports = router;
