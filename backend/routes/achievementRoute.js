const express = require('express');
const router = express.Router();

const controller = require('../controllers/achievementController');
const { validateAchievementCreation } = require('../validators/achievementValidator');

router.post('/create', validateAchievementCreation, controller.createAchievement);
router.get('/list', controller.listAchievements);

module.exports = router;