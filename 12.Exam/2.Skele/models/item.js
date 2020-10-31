const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types; 

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
    
    
})

module.exports = mongoose.model('Item', ItemSchema);
