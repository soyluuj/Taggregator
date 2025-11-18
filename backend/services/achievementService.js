const achievement = require('../models/achievementModel');
const userAchievement = require('../models/userAchievementModel');
const user = require('../models/userModel');

const achievementChecker = async (userId, criteria) => {
    const achievementRecord = await achievement.findOne({ criteria });
    if (!achievementRecord) {
        throw new Error('Achievement not found for the given criteria');
    }
    const existingUserAchievement = await userAchievement.findOne({ 
        userId,
        achievementId: achievementRecord.id
    });
    if (existingUserAchievement) {
        return { message: 'Achievement already earned' };
    }
    const newUserAchievement = new userAchievement({
        userId,
        achievementId: achievementRecord.id
    });
    await newUserAchievement.save();
    return { message: 'Achievement awarded', achievement: achievementRecord };
}

const createAchievement = async (name, description, badgeIconUrl, criteria) => {
    const newAchievement = new achievement({
        name,
        description,
        badgeIconUrl,
        criteria    
    });
    await newAchievement.save();
    return newAchievement;
}

module.exports = {
    achievementChecker,
    createAchievement,
    listAchievements
};