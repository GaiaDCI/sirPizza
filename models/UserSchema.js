const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'You must provide a valid email here',
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
})

module.exports = UserSchema;