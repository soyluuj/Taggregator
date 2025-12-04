const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/', articleController.getHomePage);

router.get('/all', articleController.getAllArticles);

router.post('/new', articleController.createArticle);

router.get('/:id', articleController.getArticle);

router.post('/:id/like', articleController.likeArticle);

module.exports = router;