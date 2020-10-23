const cubeModel = require('../models/cube');
module.exports = {
    getCubes(req, res, next) {
        const { from, search, to } = req.query;
        let query = {}; //първоначално обектът трябва да е празен
        if (search) { query.name = new RegExp(search, 'i') };
        if (from) { query.difficultyLevel = { $gte: +from } };
        if (to) {
            query.difficultyLevel = query.difficultyLevel || {} 
            query.difficultyLevel.$lte = +to;
        };

        cubeModel.find(query).lean().then(cubes => {
          res.render('index', { cubes, from, search, to });
        }).catch(next); 
    },
    getCube(req, res, next) {
        const id = req.params.id;
        return cubeModel.findById(id).then(cube => {
            res.render('details', { cube });
        }).catch(next);
    },
    getCreateCube(req, res) {
        res.render('create');
    },
    postCreateCube(req, res, next) {
        const { name, description, imageURL, difficultyLevel } = req.body;
        cubeModel.create({ name, description, imageURL, difficultyLevel: +difficultyLevel })
          .then(() => res.redirect('/'))
          .catch(next);
    }
}