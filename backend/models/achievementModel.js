const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    id: { type: String,  unique:true, default: () => uuidv4() },
    name: { type: String, required: true },
    description: { type: String, required: true },
    badgeIconUrl: { type: String, required: true },
    criteria: { type: {
            type: String, 
            required: true,
            enum: ['account_created', 'article_read', 'article_searched', 'bookmark_added', 'profile_updated', 'article_count']
        },
        field: { type: String },
        operator: { 
            type: String, 
            enum: ['>=', '==', '<=', '>', '<', 'contains', 'count_gte'] 
        },
        value: { type: mongoose.Schema.Types.Mixed }
 },
    exp: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    category: { type: String, default: 'general' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Achievement', achievementSchema);