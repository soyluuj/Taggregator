const express = require('express');
const router = express.Router();

const service = require('../services/achievementService');
const { validateAchievementCreation } = require('../validators/achievementValidator');

router.post('/create', validateAchievementCreation, service.createAchievement);
router.get('/list', async (req, res) => {
    try {
        const { category } = req.query;
        const achievements = await service.listAchievements(category);
        res.json({ success: true, achievements });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
router.get('/user/:id/progress', async (req, res) => {
    try {
        const progress = await service.getUserAchievementsProgress(req.params.userId);
        res.json({ success: true, progress });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
router.post('/user/:id/check', async (req, res) => {
    try {
        const achievements = await service.checkAllAchievements(req.params.userId);
        res.json({ success: true, achievements });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;