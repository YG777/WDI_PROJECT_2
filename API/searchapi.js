var http = require('http');

function getItem(itemId, callback) {
  var options = {
    host: 'api.snooth.com',
    port: 80,
    path: '/wines/?akey=yi5b2jcvhpfjifiqp25t7u7fbisu3k2f929ic0f5aq6y83n7&food=1&photos=1&id=(' + itemId + ')',
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
      var wine = convertObj(jsonResponse.Wines);
      callback(wine);
    });
  }).end();
}

function searchApi(searchTerm, callback) {
  var options = {
    host: 'api.snooth.com',
    port: 80,
    path: '/wines/?akey=yi5b2jcvhpfjifiqp25t7u7fbisu3k2f929ic0f5aq6y83n7&t=wine&s=price+asc&c=uk&a=1&q=(' + searchTerm +')',
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
      for (var i = 0; i < jsonResponse.wines.length; i++) {
        wines.push(convertObj(jsonResponse.wines[i]));
        // wines.push(convertObj(jsonResponse.wines.List[i]));
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
  wine.Name = jsonApiWine.name;
  wine.Id = jsonApiWine.code;
  wine.Country = jsonApiWine.region;
  wine.Vineyard = jsonApiWine.winery;
  wine.VineyardId = jsonApiWine.winery_id;
  wine.Grape = jsonApiWine.varietal;
  // wine.price = jsonApiWine.Price;
  wine.Vintage = jsonApiWine.vintage;
  wine.TypeOrColor = jsonApiWine.type;
  // wine.snoothlink = jsonApiWine.Link;
  wine.ImgLink = jsonApiWine.image;

  // wine.Description = jsonApiWine.Description;

  return wine;
}

module.exports = {
  searchApi: searchApi,
  getItem: getItem
};