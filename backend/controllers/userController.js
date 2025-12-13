const service = require('../services/userService');

const registerUser = async (req, res) => {
    try {
        const user = await service.registerUser(req.body);
        res.status(201).json(user)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const result = await service.authenticateUser(identifier, password);

        res.status(200).json({
            message: 'Login successful',
            ...result
        });
    } catch (err) {
        res.status(400).json({
            message: 'Login failed',
            error: err.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};