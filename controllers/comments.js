const Comment = require('../models/comment');

function commentCreate(req, res) {
  const wineId = req.body.wineId;
  var comment = {
    wineId: req.body.wineId,
    userId: req.session.userId,
    comment: req.body.comment
  };

  Comment
    .create(comment)
    .then(() => {
      res.redirect(`/wines/${wineId}`);
    });
}

module.exports = {
  // index: commentsAll,
  create: commentCreate
};