const Api = require('../API/searchapi');
const Wine = require('../models/wine');


function winesShow(req, res) {
  res.render('/show');
}

module.exports={
  show: winesShow
};