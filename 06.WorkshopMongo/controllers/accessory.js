const cubeModel = require('../models/accessory');
module.exports = {
    postCreateAccessory(req, res, next) {
        const { name, description, imageURL, difficultyLevel } = req.body;
        cubeModel.create({ name, description, imageURL, difficultyLevel: +difficultyLevel })
        .then(() => res.redirect('/'))
        .catch(next);
    },
    getCreateAccessory(_, res) {
        res.render('create', { layout: false });
    },
    postAttachAccessory(req, res, next) {
        const { name, description, imageURL, difficultyLevel } = req.body;
        cubeModel.create({ name, description, imageURL, difficultyLevel: +difficultyLevel })
        .then(() => res.redirect('/'))
        .catch(next);
    }
}