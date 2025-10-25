const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    id: { type: String, unique: true, default: () => uuidv4() },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    publishedDate: { type: Date, default: Date.now },
    tags: [{ type: String, trim: true }],
    isPublished: { type: Boolean, default: true }
}, {
    timestamps: true 
});

articleSchema.index({ id: 1 });
articleSchema.index({ publishedDate: -1 });

module.exports = mongoose.model('Article', articleSchema);