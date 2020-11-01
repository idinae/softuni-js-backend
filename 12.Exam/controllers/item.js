const Item = require('../models/item');

//HOME - ползва долните!
const getAllItems = async (callback) => { 
    const item = await Item.find().lean();
    return item;
}

//сортировка по записани за курса
const sortByEnrolled = async () => {
    const items = await getAllItems();
    return items
        .sort((a, b) => b.enrolled.length - a.enrolled.length)
        .slice(0, 3);
};

//сортировка по дата
const sortByDate = async () => {
    const items = await getAllItems();
    return items
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

//DETAIS - взимане на item по id
const getItem = async (id) => {
    const item = await Item.findById(id).lean();
    return item;
}

module.exports = {
    getAllItems,
    sortByEnrolled,
    sortByDate,
    getItem
}