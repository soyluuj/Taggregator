const express = require('express');
const router = express.Router();

const userProgressService = require('../services/userProgressService');
// const achievementService = require('../services/achievementService');

router.get('/progress/:userId', async (req, res) => {
    try {
        const progress = await userProgressService.getUserProgress(req.params.userId);
        res.json({ success: true, progress });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// router.get('/achievements/:userId', async (req, res) => {
//     try {
//         const achievements = await achievementService.checkAllAchievements(req.params.userId);
//         res.json({ success: true, achievements });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// });

module.exports = router;