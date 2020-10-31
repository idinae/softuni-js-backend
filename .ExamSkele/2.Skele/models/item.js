const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }//,
    // price: {
    //     type: Number,
    //     required: true,
    // },
    // imageUrl: {
    //     type: String,
    //     required: true,
    // },
    // brand: {
    //     type: String,
    //     required: true,
    // },
    // description: {
    //     type: String,
    //     required: true
    // },
    // creator: {
    //     type: ObjectId,
    //     required: true
    // },
    // buyers: [{
    //     type: ObjectId,
    //     ref: "User"
    // }]
});

module.exports = mongoose.model('Item', ItemSchema);