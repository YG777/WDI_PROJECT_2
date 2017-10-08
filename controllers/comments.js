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
}

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

function commentEdit(req, res) {
  var wineId = req.body.wineId;
  var commentId = req.body.commentId;
  var comment = req.body.comment;
  Comment.findByIdAndUpdate(commentId, { comment })
    .then(() => {
      res.redirect(`/wines/${wineId}`);
    });
}

module.exports = {
  create: commentCreate,
  delete: commentDelete,
  edit: commentEdit
};