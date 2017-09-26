const Api = require('../API/searchapi');
const List = require('../models/list');

//ALL LIST ITEMS
function listIndex(req, res, next) {
  List
    .find({
      userId: req.session.userId
    })
    .exec()
    .then(list => {
      function render(wines) {
        if (wines.length === list.length) {
          res.render('/list', {wines });
        }
      }
      var wines = [];
      list.forEach(function (listItem) {
        Api.getItem(listItem.wineId, function (wine) {
          wines.push(wine);
          render(wines);
        });
      }, this);
    })
    .catch(next);
}

//ADD A LIST ITEM
function listCreate(req, res, next) {
  var listItem = {
    wineId: req.body.wineId,
    userId: req.session.userId
  };
  List
    .create(listItem)
    .then(listItem => {
      res.redirect('/list/list');
    })
    .catch(next);
}

// SHOW LIST ITEM 
function listShow(req, res, next) {
  List
    .findById(req.params.id)
    .then(listItem => {
      res.render('list/show', {listItem});
    })
    .catch(next);
}

function listDelete(req, res, next) {
  List
    .findById(req.params.id)
    .then(listItem => {
      return listItem.remove();
    })
    .then(() => res.redirect('/list/list'))
    .catch(next);
}

module.exports = {
  list: listIndex,
  create: listCreate,
  show: listShow,
  delete: listDelete
};