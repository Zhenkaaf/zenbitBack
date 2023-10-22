const mongoose = require('mongoose');

/* const userSchema = new mongoose.Schema({ */
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },

}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;