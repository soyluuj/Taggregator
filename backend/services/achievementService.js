const achievement = require('../models/achievementModel');
const userAchievement = require('../models/userAchievementModel');
const userProgressService = require('./userProgressService');
const user = require('../models/userModel');

const evaluateCriteria = async (userId, criteria) => {
    const userRecord = await user.findOne({ id: userId });
    if (!userRecord) return false;

    const { type, field, operator, value } = criteria;

    switch (type) {
        case 'article_count':
            return evaluateFieldCriteria(userRecord, field, operator, value);
        case 'account_created':
        case 'article_read':
        case 'article_searched':
        case 'bookmark_added':
        case 'profile_updated':
            return await evaluateActionBasedCriteria(userId, type);

        default:
            return false;
    }
};

const evaluateActionBasedCriteria = async (userId, actionType) => {
    const UserAction = require('../models/userActionModel'); // You'll need to create this
    
    const actionExists = await UserAction.exists({
        userId,
        actionType,
        // You might want to check within a time period or just existence
    });
    
    return actionExists;
};

const evaluateFieldCriteria = (userRecord, field, operator, value) => {
    const fieldValue = field.split('.').reduce((obj, key) => obj?.[key], userRecord);
    
    switch (operator) {
        case '>=':
            return fieldValue >= value;
        case '<=':
            return fieldValue <= value;
        case '>':
            return fieldValue > value;
        case '<':
            return fieldValue < value;
        case '==':
            return fieldValue == value;
        case 'count_gte':
            return Array.isArray(fieldValue) ? fieldValue.length >= value : false;
        case 'contains':
            return Array.isArray(fieldValue) ? fieldValue.includes(value) : false;
        default:
            return false;
    }
};

const achievementChecker = async (userId, achievementId) => {
    const achievementRecord = await achievement.findOne({ id: achievementId });
    if (!achievementRecord || !achievementRecord.isActive) {
        throw new Error('Achievement not found or inactive');
    }

    const existingUserAchievement = await userAchievement.findOne({ 
        userId,
        achievementId: achievementRecord.id
    });
    
    if (existingUserAchievement) {
        return { message: 'Achievement already earned' };
    }

    // Dynamically evaluate criteria
    const criteriaMet = await evaluateCriteria(userId, achievementRecord.criteria);
    
    if (criteriaMet) {
        const newUserAchievement = new userAchievement({
            userId,
            achievementId: achievementRecord.id
        });
        await newUserAchievement.save();
        
        // Award EXP for achievement
        await userProgressService.addExpToUser(userId, achievementRecord.exp, `Achievement: ${achievementRecord.name}`);
        
        return { 
            message: 'Achievement awarded', 
            achievement: achievementRecord,
            expAwarded: achievementRecord.exp
        };
    }
    
    return { message: 'Criteria not met for achievement' };
}

const checkAllAchievements = async (userId) => {
    const allAchievements = await achievement.find({ isActive: true });
    const results = [];
    
    for (const achievementRecord of allAchievements) {
        const existingUserAchievement = await userAchievement.findOne({ 
            userId,
            achievementId: achievementRecord.id
        });
        
        if (!existingUserAchievement) {
            const criteriaMet = await evaluateCriteria(userId, achievementRecord.criteria);
            
            if (criteriaMet) {
                const newUserAchievement = new userAchievement({
                    userId,
                    achievementId: achievementRecord.id
                });
                await newUserAchievement.save();
                
                // Award EXP for achievement
                await userProgressService.addExpToUser(userId, achievementRecord.exp, `Achievement: ${achievementRecord.name}`);
                
                results.push({
                    achievement: achievementRecord,
                    expAwarded: achievementRecord.exp
                });
            }
        }
    }
    
    return results;
};

const recordUserAction = async (userId, actionType, metadata = {}) => {
    const UserAction = require('../models/userActionModel');
    
    const action = new UserAction({
        userId,
        actionType,
        metadata
    });
    
    await action.save();
    
    // Check achievements after recording action
    await checkAllAchievements(userId);
    
    return action;
};

const setupAchievementListeners = (eventEmitter) => {
    eventEmitter.on('user.action.article_read', async (userId, articleId) => {
        await recordUserAction(userId, 'article_read', { articleId });
    });
    
    eventEmitter.on('user.action.article_searched', async (userId, searchQuery) => {
        await recordUserAction(userId, 'article_searched', { searchQuery });
    });
    
    eventEmitter.on('user.action.bookmark_added', async (userId, articleId) => {
        await recordUserAction(userId, 'bookmark_added', { articleId });
    });
    
    eventEmitter.on('user.action.profile_updated', async (userId) => {
        await recordUserAction(userId, 'profile_updated');
    });
};

// Get achievements progress for a user
const getUserAchievementsProgress = async (userId) => {
    const allAchievements = await achievement.find({ isActive: true });
    const userAchievements = await userAchievement.find({ userId });
    const earnedAchievementIds = new Set(userAchievements.map(ua => ua.achievementId));
    
    const progress = await Promise.all(
        allAchievements.map(async (achievement) => {
            const isEarned = earnedAchievementIds.has(achievement.id);
            const progressData = await getAchievementProgress(userId, achievement);
            
            return {
                ...achievement.toObject(),
                isEarned,
                earnedAt: isEarned ? 
                    userAchievements.find(ua => ua.achievementId === achievement.id).dateAchieved : null,
                progress: progressData
            };
        })
    );
    
    return progress;
};

const createAchievement = async (req, res) => {
    try { 
        const { name, description, badgeIconUrl, criteria, exp } = req.body;
        
        const newAchievement = new achievement({
            name,
            description,
            badgeIconUrl,
            criteria,
            exp,
            isActive: isActive !== undefined ? isActive : true 
        });
        await newAchievement.save();
        
        return res.status(201).json({ success: true, achievement: newAchievement });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
    
}

const listAchievements = async () => {
    const filter = category ? { category, isActive: true } : { isActive: true };
    return await achievement.find(filter);
}

module.exports = {
    achievementChecker,
    checkAllAchievements,
    getUserAchievementsProgress,
    setupAchievementListeners,
    createAchievement,
    listAchievements
};