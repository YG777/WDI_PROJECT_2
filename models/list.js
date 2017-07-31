const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  wineId: {
    type: Number
  },
  userId: { type: String}
});


module.exports = mongoose.model('List', listSchema);