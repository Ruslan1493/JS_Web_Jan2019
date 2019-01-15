var fs = require('fs');

let db = {};

function put(key, value, callback){
  if(typeof key !== 'string'){
    throw 'Key has to be a string';
  }

  if(db[key] != undefined){
    throw 'Key already exist.';
  }

  db[key] = value;

  callback(true);
}

function get(key, callback){
  if(typeof key !== 'string'){
    throw 'Key has to be a string.';
  }

  if(db[key] == undefined){
    throw 'Key does not exist.';
  }

  callback(dn[key]);
}

function getAll(callback){
  if(Object.keys(db).length === 0){
    throw 'DB is empty';
  }

  callback(db);
}

function update(key, newValue, callback){
  if(typeof key !== 'string'){
    throw 'Key has to be a string';
  }

  if(db[key] == undefined){
    throw 'Key does not exist.';
  }

  db[key] = newValue;

  callback(true);
}

function deleteEntry(key, callback){
  if(typeof key !== 'string'){
    throw 'Key has to be a string';
  }

  if(db[key] == undefined){
    throw 'Key does not exist.';
  }

  callback(true);
}

function clear(callback){
  db = {};

  callback(true);
}

function save(callback){
  var jsonData = JSON.stringify(db);
  fs.writeFileAsync("db.json", jsonData,'utf-8', function(err) {
      if (err) {
          console.log(err);
      }
  });

  callback(true);
}

function load(callback){
  if(!fs.exists('db.json')){
    return;
  }

  db = JSON.parse(fs.readFile('db.json'));

  callback(true);
}

module.exports = {put,get,getAll,update,deleteEntry,clear,save,load};
