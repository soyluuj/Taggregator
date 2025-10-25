const bcrypt = require('bcrypt');
const user = require('../models/userModel');

const registerUser = async (userData) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    
    const newUser = new user({ 
        ...userData, 
        password: hashedPassword 
    });
    
    const savedUser = await newUser.save();

    const userObject = savedUser.toObject();
    delete userObject.password;

    return userObject;
}

const authenticateUser = async (username, password) => {
    const existingUser = await user.findOne( { username }).select('+password');
    if (!existingUser) {
        throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }

    const userObject = existingUser.toObject();
    delete userObject.password;

    return { user: userObject };
}

module.exports = {
    registerUser,
    authenticateUser
};