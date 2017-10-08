const router = require('express').Router();

const home = require('../controllers/home');
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const wines = require('../controllers/wines');
const comments = require('../controllers/comments');
const search = require('../controllers/search');
const list = require('../controllers/list');


function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      console.log('danger', 'You must be logged in.');
      res.redirect('/login');
    });
  }

  return next();
}

router.route('/')
  .get(home.home);

router.route('/search')
  .get(secureRoute, search.searchForm);  

router.route('/search/results')
  .get(secureRoute, search.search);
  
router.route('/list')
  .get(secureRoute, list.index)
  .post(secureRoute, list.create)
  .delete(secureRoute, list.delete);

router.route('/wines/:id')
  .get(secureRoute, wines.show);

router.route('/comments')
  .post(secureRoute, comments.create)
  .delete(secureRoute, comments.delete)
  .put(secureRoute, comments.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);


module.exports = router;