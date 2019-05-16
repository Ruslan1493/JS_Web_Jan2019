const fs = require('fs');
const path = require('path');
const url = require('url');

const db = require('../config/dataBase');

module.exports = (req, res) => {
    req.pathName = req.pathname || url.parse(req.url).pathname;
    if(req.pathName === '/viewAllMovies' && req.method === "GET"){
        let pathName = path.normalize(path.join(__dirname, '../views/viewAll.html'));
        fs.readFile(pathName, (err, data) =>{
            if(err) {
                console.log(err);
                return;
            };
            let movies = '';
            for(let movie of db){
                movies += 
                '<div class="movie">'+
                `<a href='/movies/details/${movie.id}'>`+
                `<img class="moviePoster" src="${movie.moviePoster}" />` +
                `<h2>${movie.movieTitle}</h2>`+            
                '</div>';
              }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            let resData = data.toString().replace('{{replaceMe}}', movies);
            res.write(resData);
            res.end();
        });
    }else{
        return true;
    }
}