'use strict';
let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  username: String,
  twitterId: Number,
  tweets: [],
  pastFlags: []
});

let User = mongoose.model('User', UserSchema);

//searches the database for a specific user or creates one
User.findOrCreate = function(twitterId, callback) {
  db.get('users', {twitterId: twitterId}).run(function (err, data) {
    if (err) return callback(err);
  })
};

User.findById = function (id, callback) {
    db.get('users', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new User(data));
    });
}


module.exports = User;
