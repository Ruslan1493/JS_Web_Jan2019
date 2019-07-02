const Cubic = require('../models/cubeSchema');

module.exports = (req, res) => {    // TODO       
        if (Object.keys(req.query).length !== 0) {
                let search = req.query.search;
                let from = Number(req.query.from);
                let to = Number(req.query.to);
                if (!req.query.search && !req.query.from && !req.query.to) {
                        console.log('err!');
                        res.locals.globalError = 'The search parameter should not be empty!';
                        res.render('index');
                } if (search && from && to) {
                        Cubic.find({})
                                .where('difficulty')
                                .lte(to)
                                .gte(from)
                                .then(cubes => {
                                        let filteredCubes = cubes.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
                                        res.render('index', { cube: filteredCubes });

                                }).catch(err => {
                                        console.log(err);
                                        return;
                                })
                }
                if (search && !from && !to) {
                        Cubic.find({})
                                .then(cubes => {
                                        let filteredCubes = cubes.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
                                        res.render('index', { cube: filteredCubes });

                                }).catch(err => {
                                        console.log(err);
                                        return;
                                })
                }
        } else {
                Cubic.find({}, (err, result) => {
                        if (err) {
                                console.log(err);
                                return;
                        }
                        res.render('index', { cube: result });
                })

        }
};