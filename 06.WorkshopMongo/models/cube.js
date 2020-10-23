const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageURL: String,
    difficultyLevel: Number,
    accessories: [mongoose.Schema.Types.ObjectId]
});

module.exports = new mongoose.model('cube', cubeSchema);