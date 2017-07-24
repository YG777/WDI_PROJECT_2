const User = require('../models/user');

function registrationsNew(req, res) {
  return res.render('registrations/new');
}
//store data in req.session
//when logged in userds id will be stored
//this property will be used to check if a valid user logged in
function registrationsCreate(req, res) {
  User
    .create(req.body)
    .then(user => {
      // req.flash('info', `Thanks for registering, ${user.username}!`);
       console.log('info', `Thanks for registering, ${user.username}!`);
      req.session.userId = user._id;
      res.redirect('/');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registrations/new');
      }
      res.status(500).end();
    });
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
