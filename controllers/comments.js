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


module.exports = {
  create: commentCreate
};