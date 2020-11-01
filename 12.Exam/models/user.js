const mongoose = require('mongoose');
const UserShcema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    enrolled: [{
        type: 'ObjectId',
        ref: 'Item'
    }]

})

module.exports = mongoose.model('User', UserShcema);