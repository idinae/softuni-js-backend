const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        required: true
    },
    usersLiked: [{
        type: ObjectId,
        ref: "User"
    }],
    creator: {
        type: ObjectId,
        ref: "User"
    }

    // price: {
    //     type: Number,
    //     required: true,
    // },
    // brand: {
    //     type: String,
    //     required: true,
    // },
    // salesman: {
    //     type: ObjectId,
    //     required: true
    // },
    // buyers: [{
    //     type: ObjectId,
    //     ref: "User"
    // }]
});

module.exports = mongoose.model('Item', ItemSchema);