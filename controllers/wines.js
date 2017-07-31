const Api = require('../API/searchapi');

function winesShow(req, res) {
  res.render('/show');
}

module.exports={
  show: winesShow
};