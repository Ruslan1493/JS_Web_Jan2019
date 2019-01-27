const fs = require('fs')
const path = require('path')
const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports.addGet  = (req,res) => {
  Category.find().then((categories) => {
    res.render('product/add', {categories: categories})
  })
}

module.exports.addPost = async (req, res) => {
  let productObj = req.body
  productObj.image = '/' + req.file.path;

  let product = await Product.create(productObj);
  let category = await Category.findById(product.category);
  category.products.push(product._id);
  category.save();
  res.redirect('/');
}

module.exports.editGet = (req, res) => {
  let id = req.params.id;
  Product.findById(id).then(product => {
    if(!product) {
      res.sendStatus('404');
      return;
    }

    Category.find().then((categories) => {
      res.render('product/edit', {
        product: product,
        categories: categories
      })
    })
  })
}

module.exports.editPost (req, res) => {
  let id = req.params.id;
  let editedProduct = req.body;

  let product = await Product.findById(id);
  if(!product){
    res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`)
    return;
  }
  product.name = editedProduct.name;
  product.description = editedProduct.description;
  product.price = editedProduct.price;

  if(req.file) {
    product.image = '/' + req.file.path;
  }

  product.save().then(() =>{
    res.redirect(`/?success=${encodeURIComponent('Component was edited successfully!')}`);
  })

  if(product.category.toString() !== editedProduct.category){
    Category.findById(editedProduct.category).then((currentCategory) => {
      let index = currentCategory.products.indexOf(product._id);
      if(index >= 0){
        currentCategory.products.splice(index, i);
      }
      currentCategory.save();

      nextCategory.products.push(product._id);
    })
  }
}
