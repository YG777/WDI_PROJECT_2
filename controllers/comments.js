

function commentsCreate(req, res) {
  Wine
    .findById(req.params.id)
    .exec()
    .then(wine => {
      req.body.user = req.user._id;
      wine.comments.push(req.body);
      wine.save();
      res.redirect(`/wines/${wine._id}`);
    });
}

function commentsDelete(req, res) {
  Wine
    .findById(req.params.wineId)
    .exec()
    .then(wine => {
      const comment = wine.comments.id(req.params.commentId);
      comment.remove();
      wine.save();
      res.redirect(`/wines/${wine._id}`);
    });
}

module.exports = {
  create: commentsCreate,
  delete: commentsDelete
};