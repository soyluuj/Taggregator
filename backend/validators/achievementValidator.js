const { body, validationResult } = require('express-validator');

const validateAchievementCreation = [
    body('name').notEmpty().trim().withMessage('Achievement name is required').escape(),
    body('description').notEmpty().trim().withMessage('Achievement description is required').escape(),
    body('badgeIconUrl').isURL().withMessage('Badge icon URL must be a valid URL').escape(),
    body('criteria').notEmpty().trim().withMessage('Achievement criteria is required').escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Validation Failed', errors: errors.array() });
        }
        next();
    }
]

module.exports = {
    validateAchievementCreation
};