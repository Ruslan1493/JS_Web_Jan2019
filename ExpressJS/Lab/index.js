const http = require('http')
const port = 3000
const handlers = require('./handlers')

http.createServer((req,res) => {
  for(let handler of Object.values(handlers)){
    if(!handler(req, res)){
      break;
    }
  }
}).listen(port)
