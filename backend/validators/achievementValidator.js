const { body, validationResult } = require('express-validator');

const validateAchievementCreation = [
    body('name').notEmpty().trim().withMessage('Achievement name is required'),
    body('description').notEmpty().trim().withMessage('Achievement description is required'),
    body('badgeIconUrl').isURL().withMessage('Badge icon URL must be a valid URL'),
    body('criteria').isObject().withMessage('Criteria must be an object'),
    body('criteria.type').isIn([
        'account_created', 
        'article_read', 
        'article_searched', 
        'bookmark_added', 
        'profile_updated', 
        'article_count'
    ]).withMessage('Invalid criteria type'),
    body('criteria.field').if(body('criteria.type').isIn([
        'article_count'
    ])).notEmpty().withMessage('Field is required for this criteria type'),
    body('criteria.operator').isIn(['>=', '==', '<=', '>', '<', 'contains', 'count_gte'])
        .withMessage('Invalid operator'),
    body('criteria.value').notEmpty().withMessage('Value is required'),
    body('exp').isInt({ min: 0 }).withMessage('EXP must be a positive integer'),
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