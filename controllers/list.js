const Api = require('../API/searchapi');
const List = require('../models/list');

//LIST INDEX - ALL WINES
function listIndex(req, res) {

  List
    .find({
      userId: req.session.userId
    })
    .exec()

    //list is passing the list of data from the DATABASE -> USER with wine id

    .then(list => {
      function render(wines) {
        if (wines.length === list.length) {
          res.render('list', {
            wines
          });
          console.log(list);
        } else if (list === 0) {
          res.render('list');
        }
      }
      //STORE WINE ID-s IN VAR WINES
      var wines = [];
      // console.log(list);

      list.forEach(function (listItem) {
        //convert it -> done in the api?
        //pass the array to render function
        Api.getItem(listItem.wineId, function (wine) {
          wines.push(wine);
          render(wines);
        });
      }, this);
    });
}

function listItemCreate(req, res) {
  //get wine id from form submitted value
  var listItem = {
    wineId: req.body.wineId,
    userId: req.session.userId
  };

  List
    .create(listItem)
    .then(() => {
      res.redirect('list');
    });
}

function listItemDelete(req, res) {
  console.log(req.session.userId);
  var listItem = {
    wineId: req.body.wineId,
    userId: req.session.userId
  };
  console.log(listItem);
  List
    .findOneAndRemove(req.body.listItem)
    .then(() => {
      res.redirect('list');
    });
}


module.exports = {
  index: listIndex,
  create: listItemCreate,
  delete: listItemDelete
};