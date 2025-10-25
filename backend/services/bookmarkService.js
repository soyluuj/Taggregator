const Bookmark = require('../models/Bookmark');
const User = require('../models/User');

class BookmarkService {
    
    async createBookmark(bookmarkData) {
        try {
            const bookmark = new Bookmark(bookmarkData);
            return await bookmark.save();
        }
        catch (error) {
            throw new Error(`Failed to create bookmark: ${error.message}`);
        }
    }

    async getUserBookmarks(userId) {
        try {
            return await Bookmark.find({ userId })
                .sort({ createdAt: -1 })
                .exec();
        } catch (error) {
            throw new Error(`Failed to fetch bookmarks: ${error.message}`);
        }
    }
}