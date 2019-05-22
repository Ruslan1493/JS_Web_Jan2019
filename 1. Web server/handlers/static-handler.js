const fs = require('fs');
const path = require('path');

function getContentType(path){
    if(path.endsWith(".css")){
        return 'text/css';
    }else if(path.endsWith(".html")){
        return 'text/html';
    }else if(path.endsWith(".js")){
        return 'application/javascript';
    }else if(path.endsWith(".jpg")){
        return 'image/jpg';
    }else if(path.endsWith(".png")){
        return 'image/png';
    }
}

module.exports = (req,res) => {
    if(req.path.startsWith('/public') && req.method === 'GET'){
        let pathName = path.normalize(path.join(__dirname, '..' + req.path));
    let stream = fs.createReadStream(pathName);
    stream.on('error', (err)=>{
        console.log(err);
        return;
    });
    res.writeHead(200, {
        'Content-Type': getContentType(req.path),
    })
    stream.pipe(res);
    }else{
        return true;
    }
}