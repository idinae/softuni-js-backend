const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    }
});

userSchema.methods.matchPassword = function () {
    
}

module.exports = new mongoose.model('cube', userSchema);