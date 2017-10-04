const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  wineId: { type: String }
});

module.exports = mongoose.model('List', listSchema);
