const staticHandler = require('./static-handler');
const homeHandler = require('./home-handler');
const movieHandler = require('./movie-handler');
const movieDetailsHandlder = require('./movie-details');
const addMovieHandler = require('./add-movie-handler');

module.exports = [homeHandler, staticHandler, movieHandler, movieDetailsHandlder, addMovieHandler];