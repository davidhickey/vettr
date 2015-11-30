'use strict';
let mongoose = require('mongoose');

let TweetSchema = new mongoose.Schema({
  body: String,
  date: Date,
  sent: Boolean,
  flags: []
});

let Tweet = mongoose.model('Tweet', TweetSchema);

//trying to get specific flags to render in app.js variable, not working yet
// EDIT by Ashe: this probably cannot affect the front end, commenting out for now
// function addFlagtoArray() {
//   Tweet.flags.push(flags);
// };

module.exports = Tweet;
