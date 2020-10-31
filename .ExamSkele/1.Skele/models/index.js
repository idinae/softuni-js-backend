const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getUserModel = require('./User');
const getItemModel = require('./Item');

module.exports = {
    User: getUserModel(mongoose, bcrypt),
    Item: getItemModel(mongoose)
};