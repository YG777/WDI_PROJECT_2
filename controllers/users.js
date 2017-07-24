const User = require('../models/user');
const Wine = require('../models/wine');

function usersShow(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      Wine
        .find({ createdBy: user._id })
        .exec()
        .then(wines => {
          res.render('users/show', { user, wines });
        });
    });
}


module.exports = {
  show: usersShow
};