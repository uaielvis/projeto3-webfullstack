const express = require('express');
const router = express.Router();
const verseController = require('../controllers/verseController');

// Rota para buscar versículos usando query parameters
router.get('/', verseController.searchVerse);

// Rota para inserir um novo versículo
router.post('/', verseController.insertVerse);

module.exports = router;


