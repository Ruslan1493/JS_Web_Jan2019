const cubicModel = require('../models/cubeSchema');

module.exports = (req, res) =>{
    cubicModel.create({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.image,
        difficulty: Number(req.body.difficulty)
    }, (err, data) => {
        if (err) {
            res.locals.globalError = err;
            res.render('create');
            // console.log(err);
            return;
        };
        res.render('index');
    })
}