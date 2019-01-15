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

  if(callback !== undefined){
    callback(key,value);
  }

}

function get(key, callback){
  if(typeof key !== 'string'){
    throw 'Key has to be a string.';
  }

  if(db[key] == undefined){
    throw 'Key does not exist.';
  }

  if(callback !== undefined){
    callback(dn[key]);
  }

  return db[key];
}

function getAll(callback){
  if(Object.keys(db).length === 0){
    throw 'DB is empty';
  }

  if(callback !== undefined){
    callback(db);
  }

  return db;
}

function update(key, newValue, callback){
  if(typeof key !== 'string'){
    throw 'Key has to be a string';
  }

  if(db[key] == undefined){
    throw 'Key does not exist.';
  }

  if(callback !== undefined){
    callback(key, newValue);
  }

  db[key] = newValue;
}

function deleteEntry(key, callback){
  if(typeof key !== 'string'){
    throw 'Key has to be a string';
  }

  if(db[key] == undefined){
    throw 'Key does not exist.';
  }

  if(callback !== undefined){
    callback(key);
  }

  delete db[key]
}

function clear(callback){
  if(callback !== undefined){
    callback(db);
  }

  db = {};
}

function save(callback){
  var jsonData = JSON.stringify(db);
  fs.writeFile("db.json", jsonData, function(err) {
      if (err) {
          console.log(err);
      }
  });
  if(callback !== undefined){
    callback(db);
  }
}

function load(callback){
  db = JSON.parse(fs.readFile('db.json'));
  if(callback !== undefined){
    callback(db);
  }
}

module.exports = {put,get,getAll,update,deleteEntry,clear,save,load};
