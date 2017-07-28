const User = require('../models/user');
const Wine = require('../models/wine');

function usersIndex(req, res) { 
  User
    .find()
    .exec()
    .then((users) => res.render('user/show', {users}));
}


function usersShow(req, res) {
  User
    .findById(req.params.id)
    .populate('wine')
    .exec()
    .then(user => {
      Wine
        .find({ createdBy: user._id })
        .populate('wine')
        .exec()
        .then(wines => {
          res.render('users/show', { user, wines });
        });
    });
}

module.exports = {
  index: usersIndex,
  show: usersShow
};