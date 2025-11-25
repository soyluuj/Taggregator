const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    id: { type: String,  unique:true, default: () => uuidv4() },
    name: { type: String, required: true },
    desctiprion: { type: String, required: true },
    badgeIconUrl: { type: String, required: true },
    criteria: { type: String, required: true },
    exp: { type: Number, required: true }
})

module.exports = mongoose.model('Achievement', achievementSchema);