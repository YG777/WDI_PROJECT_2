var http = require('http');

function searchApi(searchTerm, callback) {
  var options = {
    host: 'services.wine.com',
    port: 80,
    path: '/api/beta2/service.svc/json/catalog?apikey=74e076f5a4a991f1574d5ef79b6bd702&search=' + searchTerm,
    method: 'GET'
  };

  http.request(options, function (res) {
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      var response = JSON.parse(body);
      var wines = [];
      for(var i = 0; i < response.Products.List.length; i++){
        wines.push(convertObj(response.Products.List[i]));
      }
      callback(wines);
    });
  }).end();

  //return wine;
}

function convertObj(fullWine) {
  var wine = {};
  wine.Id = fullWine.Id;
  wine.Name = fullWine.Name;
  wine.Country = fullWine.Appellation.Name;
  wine.ImgLink = fullWine.Labels[0].Url;
  wine.Grape = fullWine.Varietal.Name;
  wine.TypeOrColor = fullWine.Varietal.WineType.Name;
  wine.Vineyard = fullWine.Vineyard.Name;
  wine.Vintage = fullWine.Vintage;
  wine.Description = wine.Description;

  return wine;
}

function searchWine(req, res){
  var searchTerm = req.query.searchTerm;
  function callback(results){
    res.render('search/results', {
      wines: results
    });
  }
  searchApi(searchTerm, callback);
}

function searchForm(req, res){
  res.render('search/form');
}

module.exports = {
  searchForm: searchForm,
  search: searchWine
};
