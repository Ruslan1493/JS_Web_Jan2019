const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let imageSchema = new Schema({
    URL:  String,
    creationDate: { type: Date, default: Date.now },
    title: String,
    description: String,
    tags: [{ type: Schema.ObjectId, ref: 'Tag'}]
  });

module.exports = mongoose.model('Image', imageSchema);
