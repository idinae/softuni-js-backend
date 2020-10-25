const accessoryModel = require('../models/accessory');
const cubeModel = require('../models/cube');

module.exports = {
    postCreateAccessory(req, res, next) {
        const { name, description, imageURL } = req.body;
        accessoryModel.create({ name, description, imageURL })
        .then(() => res.redirect('/'))
        .catch(next);
    },
    getCreateAccessory(_, res) {
        res.render('create-accessory');
    },
    postAttachAccessory(req, res, next) {
        const cubeId = req.params.id;
        const accessoryId = req.body.accessory;

        Promise.all([
            accessoryModel.updateOne({ _id: accessoryId }, { $push: { cubes: cubeId } }),
            cubeModel.updateOne({ _id: cubeId }, { $push: { accessories: accessoryId } })
        ]).then(() => {
            res.redirect('/details/' + cubeId);
        }).catch(next);
    },
    getAttachAccessory(req, res, next) { //req ще ни трябва, за да вземем id-то на кубчето
        const cubeId = req.params.id;
        Promise.all([
            cubeModel.findById(cubeId).lean(),
            //accessoryModel.find({}).lean()  //взимаме всичките аксесоари в масив с Promise.all
            //само аксесоарите, в които конкретното кубче не съществува
            accessoryModel.find({cubes: { $nin: cubeId } }).lean()  //взимаме всичките аксесоари в масив с Promise.all
        ]).then(([cube, accessories]) => {
            res.render('attach-accessory', { 
                cube, 
                accessories, 
                noAvailableAccessories: accessories.length === 0 
            });
        }).catch(next); //ако горното фейлне
    }
}