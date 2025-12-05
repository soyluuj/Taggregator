const mongoose = require('mongoose');

const userAchievementSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    achievementId: { type: String, required: true },
    dateAchieved: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User Achievement', userAchievementSchema);