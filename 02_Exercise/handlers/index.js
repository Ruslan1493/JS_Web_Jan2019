const homeHandler = require('./home')
const staticFilesHandler = require('./static-files')
const allMoviesHandler = require('./all-movies')

module.exports =  [homeHandler, staticFilesHandler, allMoviesHandler];
