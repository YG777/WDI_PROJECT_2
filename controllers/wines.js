const Api = require('../API/searchapi');
function winesShow(req, res){
  var itemId = req.params.id;
  function callback(getItem){
    res.render('wines/show', { wine: getItem});
  }

  Api.getItem(itemId, callback);
}

module.exports={
  show: winesShow
};


// var listItem = {
//   wineId: req.body.wineId,
//   userId: req.session.userId