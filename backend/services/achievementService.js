const achievement = require('../models/achievementModel');
const userAchievement = require('../models/userAchievementModel');

const achievementChecker = async (userId, criteria) => {
    // Check if the achievement with the given criteria exists
    const achievementRecord = await achievement.findOne({ criteria });
    if (!achievementRecord) {
        throw new Error('Achievement not found for the given criteria');
    }
    // Check if the user has already earned this achievement
    const existingUserAchievement = await userAchievement.findOne({ 
        userId,
        achievementId: achievementRecord.id
    });
    if (existingUserAchievement) {
        return { message: 'Achievement already earned' };
    }
    // Award the achievement to the user
    const newUserAchievement = new userAchievement({
        userId,
        achievementId: achievementRecord.id
    });
    await newUserAchievement.save();
    return { message: 'Achievement awarded', achievement: achievementRecord };
}

const createAchievement = async (name, description, badgeIconUrl, criteria, exp) => {
    const newAchievement = new achievement({
        name,
        description,
        badgeIconUrl,
        criteria,
        exp    
    });
    await newAchievement.save();
    return newAchievement;
}

const listAchievements = async () => {
    return await achievement.find({});
}

module.exports = {
    achievementChecker, 
    createAchievement, 
    listAchievements
};