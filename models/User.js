const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profileImage: {
        type: String,
        default: null
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    settings: {
        language: {
            type: String,
            enum: ['en', 'es', 'fr', 'de', 'hi', 'ta', 'ml', 'te', 'kn'],
            default: 'en'
        },
        currency: {
            type: String,
            enum: ['USD', 'EUR', 'GBP', 'JPY', 'INR'],
            default: 'USD'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
