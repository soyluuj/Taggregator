const mongoose = require('mongoose');

const userActionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    actionType: { 
        type: String, 
        required: true,
        enum: [
            'account_created',
            'article_read',
            'article_searched',
            'bookmark_added',
            'profile_updated'
        ]
    },
    metadata: { type: mongoose.Schema.Types.Mixed }, // Additional data about the action
    performedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Index for efficient querying
userActionSchema.index({ userId: 1, actionType: 1 });
userActionSchema.index({ userId: 1, actionType: 1, performedAt: -1 });

module.exports = mongoose.model('UserAction', userActionSchema);