const achievement = require('../models/achievementModel');
const userAchievement = require('../models/userAchievementModel');

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

const createAchievement = async (req, res) => {
    try { 
        const { name, description, badgeIconUrl, criteria, exp } = req.body;
        
        const newAchievement = new achievement({
            name,
            description,
            badgeIconUrl,
            criteria,
            exp    
        });
        await newAchievement.save();
        
        return res.status(201).json({ success: true, achievement: newAchievement });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
    
}

const listAchievements = async () => {
    return await achievement.find({});
}

module.exports = {
    achievementChecker, 
    createAchievement, 
    listAchievements
};