const User = require('../models/user');
const Wine = require('../models/list');

function usersIndex(req, res) { 
  User
    .find()
    .exec()
    .then((users) => res.render('user/show', {users}));
}


function usersShow(req, res) {
  User
    .findById(req.params.id)
    .populate('list')
    .exec();
  // .then(user => {
  //   Wine
  //     .find({ createdBy: user._id })
  //     .populate('list')
  //     .exec()
  //     .then(list => {
  //       res.render('users/show', { user, list });
  //     });
  // });
}

module.exports = {
  index: usersIndex,
  show: usersShow
};