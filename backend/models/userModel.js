const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String,  unique:true, default: () => uuidv4() },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema);