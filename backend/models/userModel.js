const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String,  unique:true, default: () => uuidv4() },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    following: [{ type: String }], 
    followers: [{ type: String }],
    publicProfile: { type: Boolean, default: true },
    exp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [{ type: String }]
}, {
    timestamps: true
});

userSchema.index({ following: 1 });
userSchema.index({ followers: 1 });

module.exports = mongoose.model('User', userSchema);