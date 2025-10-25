const Bookmark = require('../models/Bookmark');
const User = require('../models/User');
// Will add social services like following and public bookmarks once userModel
// implements those.

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
        } 
        catch (error) {
            throw new Error(`Failed to fetch bookmarks: ${error.message}`);
        }
    }

    async searchBookmarks(query) {
        try {
            const searchFilter = {
                isPublic: true,
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { tags: { $in: [new RegExp(query, 'i')] } }
                ]
            };

            return await Bookmark.find(searchFilter)
                .sort({ clickCount: -1 })
                .populate('userId', 'username')
                .exec();
        } 
        catch (error) {
            throw new Error(`Failed to search bookmarks: ${error.message}`);
        }
    }
}

module.exports = new BookmarkService();