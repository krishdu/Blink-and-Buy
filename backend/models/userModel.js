const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
        maxlength:[30, 'name cannot exceed more than 30 character'],
        minlength: [4, 'name should have more than 4 character']
    },
    email: {
        type: String,
        required: [true, 'Please enter your Email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your Password'],
        minlength: [8, 'password should have more than 8 character'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

module.exports = mongoose.model("User", userSchema);