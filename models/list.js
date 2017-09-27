const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  wineId: { type: String },

  userId: { type: String}
});

module.exports = mongoose.model('List', listSchema);