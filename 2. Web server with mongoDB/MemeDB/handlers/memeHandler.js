let viewAll = require('../views handler/viewAll');
let viewAddMeme = require('../views handler/viewMeme').viewMeme;
let addMeme = require('../views handler/viewMeme').addMeme;
let getDetails = require('../views handler/details');

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res);
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else if (req.pathname.startsWith('public/memeStorage') && req.method === 'GET') {
    console.log('HERE')
  } 
  else {
    return true
  }
}
