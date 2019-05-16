const url = require('url');
const fs = require('fs');
const formidable = require('formidable');
const db = require('../config/dataBase');

module.exports = (req, res) => {
    req.pathName = req.pathName || url.parse(req.url).pathName;
    if(req.pathName === '/addMovie' && req.method === 'GET'){
        fs.readFile('./views/addMovie.html', (err, data) =>{
            if(err){
                console.log(err);
                return;
            }

            res.writeHead(200,{
                'Content-Type':'text/html'
            });
            res.write(data);
            res.end();
        })
    }else if(req.pathName === '/addMovie' && req.method === 'POST'){
        let form = new formidable.IncomingForm();
        form.parse(req, (err,fields,files) => {
            if(err){
                console.log(err);
                return;
            }
            if(fields.movieTitle === '' || fields.moviePoster === ''){
                res.writeHead(400);
                res.write('<div id="errBox">' + 
                '<h2 id="errMsg">Please fill all fields</h2></div>'
                );
                res.end();
                return;
            }else{
                let newId = db.sort(function(a, b) {               
                    return b.id - a.id;
                })[0].id + 1;
                console.log(newId);
                db.push({
                    "id": newId,
                    "movieTitle": fields.movieTitle,
                    "moviePoster": fields.moviePoster,
                    "movieDescription": fields.movieDescription,
                    "movieYear": fields.movieYear,
                })
                console.log(db);
                res.write('<div id="succssesBox">' + 
                '<h2 id="succssesMsg">Movie Added</h2></div>'
                );
                res.end();
                return;
            }
        })
    }

}