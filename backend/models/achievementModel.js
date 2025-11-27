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
            enum: [] // Define types of criteria here
        },
        field: { type: String },
        operator: { 
            type: String, 
            enum: ['>=', '==', '<=', '>', '<', 'contains', 'count_gte'] 
        },
        value: { type: mongoose.Schema.Types.Mixed },
        query: { type: String }
 },
    exp: { type: Number, required: true }
})

module.exports = mongoose.model('Achievement', achievementSchema);