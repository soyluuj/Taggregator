const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

router.get('/', bookmarkController.getHomePage);

router.get('/bookmarks/new', bookmarkController.showCreateForm);
router.post('/bookmarks', bookmarkController.createBookmark);

router.get('/bookmarks/:id', bookmarkController.viewBookmark);

module.exports = router;