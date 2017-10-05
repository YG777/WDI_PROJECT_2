const Comment = require('../models/comment');

function commentCreate(req, res) {
  const wineId = req.body.wineId;
  var comment = {
    wineId: req.body.wineId,
    userId: req.session.userId,
    comment: req.body.comment,
    username: req.session.username
  };

  Comment
    .create(comment)
    .then(() => {
      res.redirect(`/wines/${wineId}`);
    });
  // console.log(comment); 
  // { wineId: 'cantina-di-soave-rosato-veneto',
  // userId: 59d48d44933a8b08c97d55bb,
  // comment: 'new commnet',
  // username: 'kat' }   

}

// function commentDelete(req, res) {
//   var wineId = req.body.wineId;

//   console.log(req.body.commentId);
//   res.redirect(`/wines/${wineId}`);
// }

function commentDelete(req, res) {

  var wineId = req.body.wineId;
  Comment
    .findByIdAndRemove(req.body.commentId, function(err) {
      if (err) throw err;
    })
    .then(() => {
      res.redirect(`/wines/${wineId}`);
    });
}

module.exports = {
  create: commentCreate,
  delete: commentDelete
};