const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(dbURL);

const User = require('../models/user');
const Wine = require('../models/wine');
const List = require('../models/list');

List.collection.drop();
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

  
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });                 
