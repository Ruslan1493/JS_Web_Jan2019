const fs = require('fs');
const idGen = require('shortid');
const formidable = require('formidable');
const db = require('../db/db.json');
const dbShow = require('./dbShow');

module.exports = (function (req, res) {
    function viewMeme(req,res){
    fs.readFile('./views/addMeme.html', (err, data) => {
        if(err){
            console.log(err);
            return;
        }

        res.writeHead(200, {
            'Content-type':'text/html',
        });
            res.write(data);
            res.end();
        })
    }

    function addMeme(req,res){
        let form = new formidable.IncomingForm();
        form.parse(req, (err,fields,files) => {
            if(err){
                console.log(err);
                return;
            }
        
            let path = files.meme.path.substring(files.meme.path.lastIndexOf("\\") + 1, files.meme.path.length);
            let type = files.meme.type.substring(files.meme.type.lastIndexOf("/") + 1, files.meme.type.length);
            if(type === 'jpeg'){
                type = 'jpg';
            }
            const meme = {
                "id": idGen.generate(),
                "title": fields.memeTitle,
                "memeSrc": `./public/memeStorage/${path}.${type}`,
                "description": fields.memeDescription,
                "privacy":fields.status,
                "dateStamp": Date.now()
            };
            db.push(meme);
            fs.copyFile(files.meme.path, `./public/memeStorage/${path}.${type}`, (err)=> {
                if(err){
                    console.log('Error copying file has occured!');
                    console.log(err);
                    return;
                }
            });
            fs.readFile('./views/viewAll.html', (errData, data) => {
                if(errData){
                    console.log(errData);
                    return;
                }
                data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', dbShow);
                res.writeHead(200, {
                    'Content-type':'text/html',
                });
                    res.write(data);
                    res.end();
                })
        });
        }

    return{
        viewMeme: viewMeme,
        addMeme: addMeme,
    }
})();