const fs = require('fs');
const path = require('path');
const url = require('url');

module.exports = (req,res) => {
    req.pathName = req.pathname || url.parse(req.url).pathname;
    if(req.pathName === '/' && req.method === 'GET'){
        let pathName = path.normalize(path.join(__dirname, '..' + '/views/home.html'));
        let stream = fs.createReadStream(pathName);
        stream.on('error', (error) => {
            console.log(error);
            return;
        });
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        stream.pipe(res);       
    }else{
        return true;
    }
}