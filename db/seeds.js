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
    username: 'martapz',
    email: 'ma@ma.co',
    password: 'password',
    passwordConfirmation: 'password'
  }])

  .then((users) => {
    console.log(`${users.length} users created!`);
    return Wine
      .create([{
        product: '62 Anniversario Primitivo di Manduria Riserva 2013',
        winery: 'Cantine San Marzano',
        description: 'Ruby red colour load and elegant, it is complex and fruity with hints of plum, cherry jam and tobacco. Full-bodied wine, soft and rich with an ending that gives notes of cocoa, coffee and vanilla.',
        createdBy: users[0]._id
        },{
        product: 'Pauillac Grand Cru Classé 2008',
        winery: 'Château Batailley',
        description: 'An upfront, easy to enjoy Batailley that is accessible now with ripe tannins and sweet red plum fruit. Balanced and well made with tannins that are ripe, supple and fine-grained.',
        createdBy: users[0]._id
        },{
        product: 'Classic Cuvee Brut',
        winery: 'Nyetimber',
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
