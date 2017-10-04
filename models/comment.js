const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String
  },
  wineId: {
    type: String
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  username: {
    type: String
  }
});

module.exports = mongoose.model('Comment', commentSchema);