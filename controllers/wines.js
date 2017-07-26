const Wine = require('../models/wine');
const User = require('../models/user');

function winesIndex(req, res, next) {
  Wine
    .find()
    .then(wines => {
      res.render('wines/index', {
        wines
      });
    })
    .catch(next);
}

function winesNew(req, res) {
  res.render('wines/new');
}

function winesCreate(req, res, next) {
  req.body.createdBy = req.user._id;
  Wine
    .create(req.body)
    .then(wine => {
      User
        .findById(req.session.userId)
        .then(user => {
          user.wine.push(wine._id); 
          user.save();
          console.log('USER **************' + user);
          res.redirect('/wines');
        });
    })
    .catch(next);
}

function winesShow(req, res, next) {
  Wine
    .findById(req.params.id)
    .populate('createdBy comments.user')
    .exec()
    .then(wine => {
      if (!wine) res.status(404).render('statics/404');
      res.render('wines/show', {
        wine
      });
    })
    .catch(next);
}

function winesEdit(req, res, next) {
  Wine
    .findById(req.params.id)
    .then((wine) => {
      if (!wine) return res.status(404).render('statics/404');
      res.render('wines/edit', {
        wine
      });
    })
    .catch(next);
}

function winesUpdate(req, res, next) {
  Wine
    .findById(req.params.id)
    .then((wine) => {
      if (!wine) return res.status(404).render('statics/404');

      for (const field in req.body) {
        wine[field] = req.body[field];
      }

      return wine.save();
    })
    .then((wine) => res.redirect(`/wines/${wine.id}`))
    .catch(next);
}

function winesDelete(req, res, next) {
  Wine
    .findById(req.params.id)
    .then((wine) => {
      if (!wine) return res.status(404).render('statics/404');
      return wine.remove();
    })
    .then(() => res.redirect('/wines'))
    .catch(next);
}

module.exports = {
  index: winesIndex,
  new: winesNew,
  show: winesShow,
  create: winesCreate,
  edit: winesEdit,
  update: winesUpdate,
  delete: winesDelete
};