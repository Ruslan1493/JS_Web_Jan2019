const url = require('url');
const fs = require('fs');
const db = require('../db/db');

module.exports = (req, res) => {
    let params = url.parse(req.url, true).query;
    let id = params.id;
    let meme = db.filter(d=> d.id === id)[0];
    fs.readFile('./views/details.html', (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        let htmlReplacement = 
        '<div class="content">'+
            `<img src="${meme.memeSrc}" alt="" />`+
            `<h3>Title ${meme.title}</h3>`+
            `<p> ${meme.description}</p>`+
        '</div>'
        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', htmlReplacement);
        res.write(data);
        res.end();
    });
}