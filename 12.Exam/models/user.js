const mongoose = require('mongoose');
const UserShcema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    // email: {
    //     type: String,
    //     required: true
    // },

    password: {
        type: String,
        required: true
    },

    likedItems: [{
        type: 'ObjectId',
        ref: 'Item'
    }]

})

module.exports = mongoose.model('User', UserShcema);