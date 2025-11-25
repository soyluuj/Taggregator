const service = require('../services/achievementService');

const checkAchievement = async (req, res) => {
    try {
        const { userId, criteria } = req.body;
        const result = await service.achievementChecker(userId, criteria);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    checkAchievement
};