const Api = require('../API/searchapi');
const List = require('../models/list');

function listIndex(req, res) {

  List
    .find({
      userId: req.session.userId
    })
    .exec()
    //list is passing the list of data from the database
    .then(list => {
      function render(wines) {
        if (wines.length === list.length) {
          res.render('/list', {
            wines
          });
        }
      }
      var wines = [];
      console.log(wines + 11);
      list.forEach(function (listItem) {
        //get the wine from the api for the list item - wineId
        //convert it
        //store in an array
        //pass teh array to render function
        Api.getItem(listItem.wineId, function (wine) {
          wines.push(wine);
          render(wines);
        });
      }, this);
    });
}

function addToList(req, res) {
  //get wine id from form submitted value
  var listItem = {
    wineId: req.body.wineId,
    userId: req.session.userId
  };
console.log(listItem + 1);

  List
    .create(listItem)
    .then(listItem => {
      res.redirect('/list');
    });
    console.log(listItem + 2);
}

module.exports = {
  index: listIndex,
  add: addToList
};

//make changes to the view to change the data
//postman
//search controller example how to make it working