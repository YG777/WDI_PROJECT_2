const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: String,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
  //TBC  wines: {type: mongoose.Schema.ObjectId, ref: 'Wine'}
});

const wineSchema = new mongoose.Schema({
  wineId: {type: String},
  ImgLink: { type: String },
  Name: {type: String},
  Vineyard: {type: String},
  Vintage: {type: String}, 
  TypeOrColor: {type: String},
  Country: {type: String},
  // description: {
  //   type: String
  // },
  comments: [commentSchema],

  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Wine', wineSchema);                                     