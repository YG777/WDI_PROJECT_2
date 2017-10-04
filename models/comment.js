const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: { type: String },
  wineId: { type: String },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Comment', commentSchema);
