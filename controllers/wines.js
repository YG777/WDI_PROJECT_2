const Api = require('../API/searchapi');
const Comment = require('../models/comment');

function winesShow(req, res){
  var itemId = req.params.id;
  var editcomment = req.query.editcomment;
  console.log(editcomment);
  function callback(getItem){
    Comment
      .find({wineId: itemId})
      .exec()
      .then(comments => {
        return res.render('wines/show', { wine: getItem, comments, editcomment: editcomment});      
      });
  }
  Api.getItem(itemId, callback);
}

module.exports={
  show: winesShow
};
