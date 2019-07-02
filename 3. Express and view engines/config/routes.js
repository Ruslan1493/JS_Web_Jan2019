const path = require('path');
const indexView = require('../controllers/indexView');
const aboutView = require('../controllers/aboutView');
const createView = require('../controllers/createView');
const createPost = require('../controllers/createPost');
const detailsView = require('../controllers/detailsView');
const searchView = require('../controllers/searchView');

module.exports = app => {
    app.get('/', indexView);
    app.get('/about', aboutView);
    app.get('/create', createView);
    app.post('/create', createPost);
    app.get('/details/:id', detailsView);
    // app.get('/?search*', searchView);
};