const bookmarkService = require('../services/bookmarkService');

const bookmarkController = {
    getHomePage: async (req, res) => {
        try {
            const userId = req.user?.id; // Assuming you have auth
            const bookmarks = userId 
                ? await bookmarkService.getFollowedUsersBookmarks(userId)
                : await bookmarkService.getPopularBookmarks();
            
            res.render('home', {
                bookmarks,
                pageTitle: userId ? 'Following' : 'Popular Bookmarks'
            });
        } catch (error) {
            res.status(500).render('error', { error: 'Failed to load bookmarks' });
        }
    },

    showCreateForm: (req, res) => {
        res.render('create-bookmark');
    },

    createBookmark: async (req, res) => {
        try {
            const { url, title, description, tags, isPublic } = req.body;
            const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
            
            await bookmarkService.createBookmark({
                url,
                title,
                description,
                tags: tagArray,
                isPublic: isPublic === 'true',
                userId: req.user.id
            });
            
            res.redirect('/');
        } catch (error) {
            res.status(500).render('error', { error: 'Failed to create bookmark' });
        }
    },

    viewBookmark: async (req, res) => {
        try {
            const { id } = req.params;
            await bookmarkService.incrementClickCount(id);
            // To do: Add logic to fetch and display the bookmark
            res.redirect(`/bookmarks/${id}`);
        } catch (error) {
            res.status(500).render('error', { error: 'Failed to view bookmark' });
        }
    }
};

module.exports = bookmarkController;