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
    duration: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    enrolled: [{
        type: ObjectId,
        ref: "User"
    }],
    creator: {
        type: ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Item', ItemSchema);