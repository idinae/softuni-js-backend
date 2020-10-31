const Item = require('../models/item');

const getAllItems = async (callback) => { 
    const item = await Item.find().lean();    
    return item;
}



module.exports = {
    getAllItems,
    getItem
}