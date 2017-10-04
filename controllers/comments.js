function commentCreate(req, res) {
  const wineId = req.body.wineId;
  const userId = req.session.userId;
  const newComment = req.body.comment;
  console.log(wineId);
  console.log(userId);
  console.log(newComment);

  res.redirect(`/wines/${wineId}`);
}




module.exports = {
  // index: commentsAll,
  create: commentCreate
};