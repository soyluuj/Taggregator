const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String,  unique:true, default: () => uuidv4() },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true }, /* Added this line */
    password: { type: String, required: true },
    following: [{ type: String }], 
    followers: [{ type: String }],
    publicProfile: { type: Boolean, default: true }
}, {
    timestamps: true
});

userSchema.index({ following: 1 });
userSchema.index({ followers: 1 });

module.exports = mongoose.model('User', userSchema);
