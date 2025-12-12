const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    id: { type: String, unique: true, default: () => uuidv4() },
    url: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    userId: { type: String, ref: 'User', required: true }, 
}, {
    timestamps: true
});

bookmarkSchema.index({ userId: 1, createdAt: -1 });
bookmarkSchema.index({ tags: 1 });
bookmarkSchema.index({ isPublic: 1 });

module.exports = mongoose.model('Bookmark', bookmarkBookmark);