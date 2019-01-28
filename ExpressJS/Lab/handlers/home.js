const path = require('path')
const Product = require('../models/Product')

module.exports.index = (req, res) => {
    let queryData = req.query;
    let products = [];

    Product.find().populate('ategory').then((products) => {
      if(queryData.query){
        products = products.filter(
          product => product.name.toLowerCase()
          .includes(queryData.query))
      }
    res.render('home/index',{products: products})
    })
}
