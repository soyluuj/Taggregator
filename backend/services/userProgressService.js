const user = require('../models/userModel');

const EXP_REQUIREMENTS = {
    1: 0,
    2: 100,
    3: 300,
    4: 600,
    5: 1000,
    // Add more levels as needed
};

const calculateLevel = (exp) => {
    let level = 1;
    const levels = Object.keys(EXP_REQUIREMENTS).sort((a, b) => b - a);
    
    for (const lvl of levels) {
        if (exp >= EXP_REQUIREMENTS[lvl]) {
            level = parseInt(lvl);
            break;
        }
    }
    return level;
};

const addExpToUser = async (userId, expToAdd, reason = '') => {
    try {
        const userRecord = await user.findOne({ id: userId });
        if (!userRecord) {
            throw new Error('User not found');
        }

        const oldLevel = userRecord.level;
        const newExp = userRecord.exp + expToAdd;
        const newLevel = calculateLevel(newExp);

        const updatedUser = await user.findOneAndUpdate(
            { id: userId },
            { 
                exp: newExp,
                level: newLevel
            },
            { new: true }
        );

        // Return level up information for potential achievements
        return {
            user: updatedUser,
            levelUp: oldLevel !== newLevel,
            expGained: expToAdd,
            oldLevel,
            newLevel,
            reason
        };
    } catch (error) {
        throw new Error(`Failed to add EXP: ${error.message}`);
    }
};

const getUserProgress = async (userId) => {
    const userRecord = await user.findOne({ id: userId });
    if (!userRecord) {
        throw new Error('User not found');
    }

    const currentLevelExp = EXP_REQUIREMENTS[userRecord.level] || 0;
    const nextLevelExp = EXP_REQUIREMENTS[userRecord.level + 1] || currentLevelExp + 100;
    const expToNextLevel = nextLevelExp - userRecord.exp;

    return {
        level: userRecord.level,
        exp: userRecord.exp,
        currentLevelExp,
        nextLevelExp,
        expToNextLevel,
        progressPercentage: Math.min(100, ((userRecord.exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100)
    };
};

module.exports = {
    addExpToUser,
    getUserProgress,
    calculateLevel,
    EXP_REQUIREMENTS
};