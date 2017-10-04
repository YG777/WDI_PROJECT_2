const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: String,
  wineId: String,
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('List', commentSchema);
