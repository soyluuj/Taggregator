const express = require('express');
const router = express.Router();

const service = require('../services/achievementService');
const { validateAchievementCreation } = require('../validators/achievementValidator');

router.post('/create', validateAchievementCreation, service.createAchievement);
router.get('/list', controller.listAchievements);

module.exports = router;