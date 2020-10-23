const accessoryModel = require('../models/accessory');
module.exports = {
    postCreateAccessory(req, res, next) {
        const { name, description } = req.body;
        accessoryModel.create({ name, description, imageURL })
        .then(() => res.redirect('/'))
        .catch(next);
    },
    getCreateAccessory(_, res) {
        res.render('create-accessory', { layout: false });
    },
    postAttachAccessory(req, res, next) {
        const { name, description, imageURL } = req.body;
        accessoryModel.create({ name, description, imageURL })
        .then(() => res.redirect('/'))
        .catch(next);
    }