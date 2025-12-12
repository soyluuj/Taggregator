const Bookmark = require('../models/bookmarkCollectionsModel');
const User = require('../models/userModel');

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

    async getFollowedUsersBookmarks(userId) {
        try {
            const user = await User.findOne({ id: userId });
            if (!user || !user.following.length) return [];
            
            return await Bookmark.find({
                userId: { $in: user.following },
                isPublic: true
            })
            .sort({ createdAt: -1 })
            .populate('userId', 'username') 
            .exec();
        } catch (error) {
            throw new Error(`Failed to fetch followed users bookmarks: ${error.message}`);
        }
    }
}

module.exports = new BookmarkService();