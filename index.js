const http = require('http');
const url = require('url');
const port = 3000;

const handlers = require('./handlers/index');

let server = http.createServer((req, res) => {
    req.path = url.parse(req.url).pathname;
    for(let handler of handlers){
        
        if(handler(req,res)===false){
            debugger;
            break;
        }
    }
})

server.listen(port, () => {
    console.log(`Server listens on port:${port}`)
});