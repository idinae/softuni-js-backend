const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const accessorySchema = new mongoose.Schema({
    name: String,
    description: String,
    imageURL: String,
    difficultyLevel: Number,
    cubes:  [Types.ObjectId]
});

module.exports = new mongoose.model('accessory', accessorySchema);