const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let tagSchema = new Schema({
    name:  String,
    date: { type: Date, default: Date.now },
    images: [{ type: Schema.ObjectId, ref: 'Image'}]
  });

module.exports = mongoose.model('Tag', tagSchema);
