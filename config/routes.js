const router = require('express').Router();

// const statics = require('../controllers/statics');
const home = require('../controllers/home');
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const wines = require('../controllers/wines');
const users = require('../controllers/users');
const comments = require('../controllers/comments');
const search = require('../controllers/search');
const list = require('../controllers/list');


// // securing routes - if no userid in the session, back to login
// function secureRoute(req, res, next) {
//   if (!req.session.userId) {
//     return req.session.regenerate(() => {
//       // req.flash('danger', 'You must be logged in to view this content');
//       console.log('danger', 'You must be logged in to view this content');
//       res.redirect('/login');
//     });
//   }
//   return next();
// }

router.route('/')
  .get(home.home);

router.route('/search')
  .get(search.searchForm);  

router.route('/search/results')
  .get(search.search);
  
router.route('/list')
  .get(list.index)
  .post(list.create)
  .delete(list.delete);

router.route('/wines/:id')
  .get(wines.show);

router.route('/comments')
  .post(comments.create)
  .delete(comments.delete);

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