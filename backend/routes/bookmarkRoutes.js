const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

router.get('/', bookmarkController.getHomePage);

router.post('/new', bookmarkController.createBookmark);
router.get('/:id', bookmarkController.viewBookmark);

module.exports = router;