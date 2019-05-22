const fs = require('fs');
const dbShow = require('./dbShow');

module.exports = (req, res) => {
    fs.readFile('./views/viewAll.html', (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', dbShow);
        res.writeHead(200, {
            'Content-type':'text/html',
        });
        res.write(data);
        res.end();
    })
}