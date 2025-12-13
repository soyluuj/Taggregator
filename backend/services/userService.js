const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const registerUser = async (userData) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    
    const newUser = new User({ 
        ...userData, 
        password: hashedPassword 
    });
    
    const savedUser = await newUser.save();
    const userObject = savedUser.toObject();
    delete userObject.password;
    
    // Generate JWT token
    const token = jwt.sign(
        { userId: userObject.id, username: userObject.username },
        process.env.JWT_SECRET || 'your-secret-key-change-in-production',
        { expiresIn: '7d' }
    );
    
    return { user: userObject, token };
}

const authenticateUser = async (identifier, password) => {
    // ✅ Look for user by either username OR email
    const existingUser = await User.findOne({ 
        $or: [
            { username: identifier },
            { email: identifier }
        ]
    }).select('+password');
    
    if (!existingUser) {
        throw new Error('Invalid username/email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        throw new Error('Invalid username/email or password');
    }

    const userObject = existingUser.toObject();
    delete userObject.password;
    
    // Generate JWT token
    const token = jwt.sign(
        { userId: userObject.id, username: userObject.username },
        process.env.JWT_SECRET || 'your-secret-key-change-in-production',
        { expiresIn: '7d' }
    );
    
    return { user: userObject, token };
}

module.exports = {
    registerUser,
    authenticateUser
};