const Api = require('../API/searchapi');

function searchWine(req, res){
  //get the search term from the querystring
  var searchTerm = req.query.searchTerm;

  //searchApi takes a callback function
  //this will render the view with the view model when it is called
  function callback(searchResults){
    res.render('search/results', {
      wines: searchResults
    });
    console.log(searchResults);
  }
  //call API and render view when done
  Api.searchApi(searchTerm, callback);
}

function searchForm(req, res){
  res.render('search/form');
}

module.exports = {
  searchForm: searchForm,
  search: searchWine
};
