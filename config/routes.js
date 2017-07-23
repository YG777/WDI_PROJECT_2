const router = require('express').Router();

const statics = require('../controllers/statics');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');

//securing routes - if no userid in the session, back to login
// function secureRoute(res, req, next) {
//   if (!req.session.UserId){
//     return req.session.regenerate(() => {
//       res.redirect('/login');
//     });
//   }
//   return next();
// }

router.route('/')
  .get(statics.homepage);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
   .get(sessions.delete);
    
router.route('/')
  .get(statics.homepage);

module.exports = router;
