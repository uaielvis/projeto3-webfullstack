const express = require('express');
const router = express.Router();
const auth = require('../config/authMiddleware');
const { searchVerse } = require('../controllers/verseController');

router.get('/verses', auth, searchVerse);

module.exports = router;
router.post('/verses', auth, insertVerse);
