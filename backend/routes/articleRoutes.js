const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/', articleController.getHomePage);

router.get('/articles', articleController.getAllArticles);

router.get('/articles/new', articleController.showCreateForm);
router.post('/articles', articleController.createArticle);

router.get('/articles/:id', articleController.getArticle);

router.post('/articles/:id/like', articleController.likeArticle);

module.exports = router;