const cubeModel = require('../models/cube');

module.exports = {
    /* WITHOUT SEARCH
    getCubes: function(req, res, next) {
        cubeModel.getAll().then(cubes => {
        res.render('index', { layout: false, cubes });
        }).catch(next); //catch(err => next(err))
    },
    */
    getCubes(req, res, next) {
        const { from, search, to } = req.query;
        return cubeModel.getAll({ name: search, from: +from, to: +to }).then(cubes => {
           res.render('index', { layout: false, cubes, from, search, to });
           //throw new Error('ERROR!'); //като хвърлим грешка тук, отиваме в глобалния error handler в index.js
        }).catch(next); //catch(err => next(err))
    },
    getCube(req, res, next) {
        const id = +req.params.id;
        cubeModel.findById(id).then(cube => {
            res.render('details', { layout: false, cube });
        }).catch(next);
    },
    getCreateCube(req, res) {
        res.render('create', { layout: false })
    },
    postCreateCube(req, res, next) {
        const { name, description, imageURL, difficultyLevel } = req.body;
        cubeModel.insert(name, description, imageURL, +difficultyLevel)
          .then(() => res.redirect('/'))
          .catch(next);
    }

}