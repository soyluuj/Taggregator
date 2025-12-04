const articleService = require('../services/articleService');

const articleController = {
    getHomePage: async (req, res) => {
        try {
            const articles = await articleService.getPopularArticles();
            res.render('index', {
                articles,
                pageTitle: 'Popular Articles'
            });
        } catch (error) {
            console.error('Error in getHomePage:', error);
            res.status(500).render('error', { error: 'Failed to load articles' });
        }
    },

    getAllArticles: async (req, res) => {
        try {
            const articles = await articleService.getAllArticles();
            res.render('index', {
                articles,
                pageTitle: 'All Articles'
            });
        } catch (error) {
            console.error('Error in getAllArticles:', error);
            res.status(500).render('error', { error: 'Failed to load articles' });
        }
    },

    getArticle: async (req, res) => {
        try {
            const { id } = req.params;
            await articleService.incrementViewCount(id);
            const article = await articleService.getArticleById(id);
            
            if (!article) {
                return res.status(404).render('error', { error: 'Article not found' });
            }
            
            res.render('article-detail', { article });
        } catch (error) {
            console.error('Error in getArticle:', error);
            res.status(500).render('error', { error: 'Failed to load article' });
        }
    },

    likeArticle: async (req, res) => {
        try {
            const { id } = req.params;
            await articleService.incrementLikeCount(id);
            res.redirect(`/articles/${id}`);
        } catch (error) {
            console.error('Error in likeArticle:', error);
            res.status(500).render('error', { error: 'Failed to like article' });
        }
    },

    showCreateForm: (req, res) => {
        res.render('create-article');
    },

    createArticle: async (req, res) => {
        try {
            const { title, content, author, tags } = req.body;

            let tagArray = [];
            
            if (tags) {
                if (typeof tags === 'string') {
                    // If tags is a string (comma-separated)
                    tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
                } else if (Array.isArray(tags)) {
                    // If tags is already an array
                    tagArray = tags.map(tag => String(tag).trim()).filter(tag => tag);
                }
            }
            
            await articleService.createArticle({
                title,
                content,
                author,
                tags: tagArray
            });
            
            res.redirect('/');
        } catch (error) {
            console.error('Error in createArticle:', error);
            res.status(500).render('error', { error: 'Failed to create article' });
        }
    }
};

module.exports = articleController;