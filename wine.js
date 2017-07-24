const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: String,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

const wineSchema = new mongoose.Schema({
  product: { type: String, required: true },
  winery: { type: String },
  synopsis: { type: String },
  description: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Wine', wineSchema);


