const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    id: { type: String, unique: true, default: () => uuidv4() },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    userId: { type: String, ref: 'User', required: true },
    isPublic: { type: Boolean, default: true },

    bookmarks: [{ type: String, ref: 'Bookmark' }] 
}, {
    timestamps: true
});

module.exports = mongoose.model('Collection', collectionSchema);