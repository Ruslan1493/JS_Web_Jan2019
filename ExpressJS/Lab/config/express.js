const express = require('express')
const path = require('path')
const bp = require('body-parser')
const handlebars = require('express-handlebars')

module.exports = (app, config) => {
  app.engine('.hbs', handlebars({
    defaultLayout: 'layout',
    extname: '.hbs'
  }));
  app.set('view engine', '.hbs')

  app.use(bp.urlencoded({extended: true}))

  app.use((req, res, next) => {
    if(req.url.startsWith('/content')){
      req.url = req.url.replace('/content', '');
    }

    next();
  }, express.static(
    path.normalize(
      path.join(config.rootPath, 'content')
    )
  ))
}
