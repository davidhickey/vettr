'use strict';

let Tweet = require('./models/tweets.js');
let User = require('./models/users.js');
let mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:7000/vettr_app', function(err) {
//   if (err) {
//     console.log('connection error', err);
//   } else {
//     console.log('connection successful');
//   }
// });

var mongoURI = "mongodb://localhost/vettr_app";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log("error message: ", err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

let firstTweet = new Tweet({
  body: "This is the first fucking tweet",
  date: Date.now(),
  sent: false,
  flags: []
});

let someUser = new User({
  username: 'jagoff',
  tweets: [],
  pastFlags: []
});

firstTweet.save();
someUser.save();
