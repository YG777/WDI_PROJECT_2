const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: String,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
  //TBC  wines: {type: mongoose.Schema.ObjectId, ref: 'Wine'}
});

const wineSchema = new mongoose.Schema({
  images: { 
    type: String 
  },
  product: {
    type: String,
    required: true
  },
  winery: {
    type: String
  },
  winetype: {
    type: String
  },
  region: {
    type: String
  },
  description: {
    type: String
  },
  comments: [commentSchema],

  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Wine', wineSchema);