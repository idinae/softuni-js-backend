const Item = require('../models/item');

//HOME - ползва долните!
const getAllItems = async (callback) => { 
    const item = await Item.find().lean();
    return item;
}

//сортировка по лайкове: 
//1.филтрираме само публичните 2.сортираме по дължина на масива низходящо
const sortByLikes = async () => {
    const items = await getAllItems();
    return items
        .filter(x => x.isPublic === true)
        .sort((a, b) => b.usersLiked.length - a.usersLiked.length);
};

//сортировка по дата
const sortByDate = async () => {
    const items = await getAllItems();
    return items
        .filter(x => x.isPublic === false)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

//DETAIS - взимане на item по id
const getItem = async (id) => {
    const item = await Item.findById(id).lean();
    return item;
}

//EDIT



module.exports = {
    getAllItems,
    sortByLikes,
    sortByDate,
    getItem
}