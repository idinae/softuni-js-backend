const { Item } = require('../models');

module.exports = {
    get: {
        all(req, res, next) {

            Item
                .find({})
                .lean()
                .then((items) => {
                    console.log(items);
                    res.render('./items/items.hbs', {
                        items
                    });
                })
                .catch((e) => console.log(e));
        },

        create(req, res, next) {
            res.render('./items/create.hbs');
        },

        details(req, res, next) {

            Item
                .findOne({ _id: req.params.itemId })
                .lean()
                .then((item) => {
                    res.render('./items/details.hbs', { ...item });
                })
        },

        edit(req, res, next) {

            Item
                .findOne({ _id: req.params.itemId })
                .then((item) => {
                    res.render('./items/edit.hbs', item);
                });
        },

        delete(req, res, next) {

            Item
                .deleteOne({ _id: req.params.itemId })
                .then((result) => {
                    res.redirect('/items/all');
                })
        }

    },

    post: {
        create(req, res, next) {
            Item
                .create({ ...req.body, salesman: req.user._id })
                .then((createdItem) => {
                    console.log(createdItem);
                    res.redirect('/items/all');
                });
        },

        edit(req, res, next) {

            const { itemId } = req.params;

            Item
                .updateOne(
                    { _id: itemId },
                    { $set: { ...req.body } }
                ).then((updatedItem) => {
                    res.redirect(`/items/details/${itemId}`)
                });
        }
    }
};