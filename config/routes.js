const router = require('express').Router();

const statics       = require('../controllers/statics');
const sessions      = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const wines         = require('../controllers/wines');
const users         = require('../controllers/users');
// const comments      = require('../controllers/comments');

// securing routes - if no userid in the session, back to login
function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      // req.flash('danger', 'You must be logged in to view this content');
      console.log('danger', 'You must be logged in to view this content');
      res.redirect('/login');
    });
  }
  return next();
}

router.route('/')
  .get(statics.index);

router.route('/wines')
  .get(wines.index)
  .post(secureRoute, wines.create);

router.route('/wines/new')
  .get(secureRoute, wines.new);

router.route('/wines/:id')
  .get(wines.show)
  // .post(secureRoute, comments.create)
  .put(secureRoute, wines.update)
  .delete(secureRoute, wines.delete);

router.route('/wines/:id/edit')
  .get(wines.edit)
  .put(secureRoute, wines.update)
  .post(secureRoute, wines.create)
  .delete(secureRoute, wines.delete);
// router.route('/wines/:winesId/comments/:commentId')
//   .delete(comments.delete);            

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
   .get(sessions.delete);
    
router.route('/users/:id')
  .get(users.show);

module.exports = router;
