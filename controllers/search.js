var http = require('http');

function searchApi(searchTerm, callback) {
  var options = {
    host: 'services.wine.com',
    port: 80,
    path: '/api/beta2/service.svc/json/catalog?apikey=74e076f5a4a991f1574d5ef79b6bd702&search=' + searchTerm,
    method: 'GET'
  };

  http.request(options, function (res) {
    // retrieve data chunks and create a string representation of them
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      //convert data to json object
      var jsonResponse = JSON.parse(body);
      var wines = [];
      //loop through teh wines in the response and convert them into our view model
      for(var i = 0; i < jsonResponse.Products.List.length; i++){
        wines.push(convertObj(jsonResponse.Products.List[i]));
      }
      //return the converted view models
      callback(wines);
    });
  }).end();
}

//this function creates an object that is used as a view model
//the data is populated there
function convertObj(jsonApiWine) {
  var wine = {};
  wine.Id = jsonApiWine.Id;
  wine.Name = jsonApiWine.Name;
  wine.Country = jsonApiWine.Appellation.Name;
  wine.ImgLink = jsonApiWine.Labels[0].Url;
  wine.Grape = jsonApiWine.Varietal.Name;
  wine.TypeOrColor = jsonApiWine.Varietal.WineType.Name;
  wine.Vineyard = jsonApiWine.Vineyard.Name;
  wine.Vintage = jsonApiWine.Vintage;
  wine.Description = jsonApiWine.Description;

  return wine;
}

function searchWine(req, res){
  //get the search term from the querystring
  var searchTerm = req.query.searchTerm;

  //searchApi takes a callback function
  //this will render the view with the view model when it is called
  function callback(searchResults){
    res.render('search/results', {
      wines: searchResults
    });
  }
  
  //call API and render view when done
  searchApi(searchTerm, callback);
}

function searchForm(req, res){
  res.render('search/form');
}

module.exports = {
  searchForm: searchForm,
  search: searchWine
};
