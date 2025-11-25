const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String,  unique:true, default: () => uuidv4() },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    exp: { type: Number, default: 0, min: 0 },
    level: { type: Number, default: 1, min: 1 },
    badges: { type: [String], default: [] }
})

module.exports = mongoose.model('User', userSchema);