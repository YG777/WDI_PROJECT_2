const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(dbURL);

const User = require('../models/user');
const Wine = require('../models/wine');

User.collection.drop();
Wine.collection.drop();

User
  .create([{
    username: 'kat',
    email: 'kat@gmail.com',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'ecompton',
    email: 'ed.compton@ga.co',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'harrystirling',
    email: 'harry.stirling@ga.co',
    password: 'password',
    passwordConfirmation: 'password'
  }])

  .then((users) => {
    console.log(`${users.length} users created!`);
    return Wine
      .create([{
        createdBy: users[0]._id,
        images: 'http://cache.wine.com/labels/139497l.jpg',
        product: 'Ciacci Piccolomini d\'Aragona Brunello di Montalcino Riserva 2010',
        winery: 'Ciacci Piccolomini d\'Aragona',
        winetype: 'Red Wines',
        region: 'Italy, Tuscany',
        description: 'Ruby red colour load and elegant, it is complex and fruity with hints of plum, cherry jam and tobacco. Full-bodied wine, soft and rich with an ending that gives notes of cocoa, coffee and vanilla.',
        comments: [{
          body: 'COOOOOOOL',
          user: users[1]._id
        }]
      },{
        images: 'https://cdn.majestic.co.uk/INTERSHOP/static/WFS/Majestic-uk-Site/-/Majestic/en_GB/p/01932_p.jpg',
        product: 'Pauillac Grand Cru Classé 2008',
        winery: 'Château Batailley',
        winetype: 'Red Wine',
        region: 'France, Burgundy',
        description: 'An upfront, easy to enjoy Batailley that is accessible now with ripe tannins and sweet red plum fruit. Balanced and well made with tannins that are ripe, supple and fine-grained.',
        createdBy: users[1]._id,
        comments: [{
          body: 'COOOOOOOL',
          user: users[1]._id  
        }]
      },{
        images: [
          'http://cache.wine.com/labels/144307m.jpg'
        ],
        product: 'Nicolas Feuillatte Brut Reserve',
        winery: 'Champagne Nicolas Feuillatte',
        winetype: 'Champagne & Sparkling',
        region: 'France, Champagne',
        description: 'The palate supports these complex aromas with honey, almond, pastry and baked apple flavours. Very fine and elegant with a great combination of intensity, delicacy and length.',
        createdBy: users[0]._id
      }]);
  })
  .then((wines) => {
    console.log(`${wines.length} wines created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });                 
