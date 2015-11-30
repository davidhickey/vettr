'use strict'
let express = require('express'),
    app = express(),
    bodyParser = require('body-parser').urlencoded({ extended: true }),
    logger = require('morgan'),
    fs = require('fs'),
    passport = require('passport'),
    Strategy = require('passport-twitter').Strategy,
    underscore = require('underscore'),
    cookieParser = require('cookie-parser'),
    request = require('request'),
    theToken,
    userProfile, // properties id and username will be inside this later
    route;

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));

//below 2 lines gave me errors as I emulated express tutorial's server.js
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/vettr_app');


let Tweet = require('./models/tweets.js');
let User = require('./models/users.js');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (callback) => {
  console.log('mongoose connected');
});

// this reads all files within the controller folder
// they are then 'required' so that their app.get methods become accessible
// shamelessly stolen from Colin Hart!
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});


// passport setup

// passport.use(new Strategy({
//     consumerKey: process.env.CONSUMER_KEY,
//     consumerSecret: process.env.CONSUMER_SECRET,
//     callbackURL: "localhost:7000/auth/twitter/callback"
//   }),
//   function(token, tokenSecret, profile, done) {
//     User.findOrCreate(profile, function (err, user) {
//       return done(err, user);
//     });
//   }
// );
passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: (process.env.CALLBACK_URL || 'localhost:7000/login/twitter/callback')
  },
  function(token, tokenSecret, profile, cb) {
    theToken = token;
    userProfile = profile;
    console.log('token: ' + token);
    console.log('profile ' + profile);
    return cb(null, profile);
  }));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
})

app.get('/login', function(req, res){
    res.render('login');
  });

app.get('/login/twitter',
  passport.authenticate('twitter'));

app.get('/login/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

  app.get('/username', function(req, res){
    if (userProfile){
      res.send(userProfile.username);
    } else {
      res.send(null);
    }
    });

  app.post('/tweets/send/:id', function(req,res){
    let status = "status="
    // TODO build url
    request.post("https://api.twitter.com/1/statuses/update.json");
  });

//   app.post('/tweet', function(req, res){
//   console.log('hit /tweet');
//   request('https://api.twitter.com/1.1/statuses/update.json?status=test%20tweet');
// });



app.set('port', (process.env.PORT || 7000));

app.listen(app.get('port'), function() {
  console.log("App runnin on port : ", app.get('port'));
});
