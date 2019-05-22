const fs = require('fs');
const url = require('url');
const path = require('path');
const db = require('../config/dataBase');

module.exports = (req,res) => {
    req.pathName = req.pathName || url.parse(req.url).pathname;
    let urlString = url.parse(req.url).pathname;
    let id = urlString.substring(urlString.lastIndexOf('/') + 1, urlString.length);
    if(req.pathName === `/movies/details/${id}` && req.method === 'GET'){
        let pathName = path.normalize(path.join(__dirname, '../views/details.html'));
        fs.readFile(pathName, (err, data) => {
            let detailsHtml = '';
            const movie = db[id-1];
            detailsHtml += '<div class="content">' +
            `<img src="${movie.moviePoster}" alt="" />` +
            `<h3>Title: ${movie.movieTitle}</h3>` + 
            `<h3>Year: ${movie.movieYear}</h3>` + 
            `<p>Title: ${movie.movieDescription}</p>` + 
            '</div>';
            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', detailsHtml);
            res.writeHead(200, {
                'Content-type':'text/html'
            });
            res.write(data);
            res.end();
        });
    }
}