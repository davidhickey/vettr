'use strict';
let mongoose = require('mongoose');
let Tweet = require('../models/tweets.js');
let User = require('../models/users.js');
let _ = require('underscore');
let flags = {'not for nothing':'warn-idiot', 'not for nuthin':'warn-idiot', 'im just saying':'warn-idiot',
'im just sayin':'warn-idiot','vaccines cause autism':'fail-idiot','the best':'warn-idiot',
'the worst':'warn-idiot','always':'warn-idiot','never':'warn-idiot','freedom':'warn-idiot','have to admit':'warn-idiot',
'terrible':'warn-idiot','the best':'warn-idiot','nickelback':'fail-idiot','katy perry':'warn-idiot',
'to be honest':'warn-idiot','when i was younger':'warn-idiot','back in the day':'warn-idiot','guaranteed':'warn-idiot',
'the eighties':'warn-idiot','bill cosby':'warn-idiot','donald trump':'warn-idiot','sarah palin':'warn-idiot',
'get this country back to work':'warn-idiot','make america great again':'warn-idiot','middle class':'warn-idiot',
'xfl':'warn-idiot','did anybody see':'warn-idiot','lindsay lohan':'warn-idiot','kim kardashian':'warn-idiot',
'kanye west':'warn-idiot','drake':'warn-idiot','know in my heart':'warn-idiot','not to be racist':'fail-idiot',
'i just know':'warn-idiot','hitler':'warn-idiot','nazi':'warn-idiot','socialism':'warn-idiot',
'capitalism':'warn-idiot','i feel like':'warn-idiot','i think that':'warn-idiot','global warming':'warn-idiot',
'climate change':'warn-idiot','its a shame':'warn-idiot','brittney spears':'fail-idiot','family values':'fail-idiot',
'i like internet explorer':'fail-idiot','internet explorer is great':'fail-idiot','yolo':'fail-idiot',
'carpe diem':'fail-idiot','prequel trilogy':'fail-idiot','stock market':'warn-idiot','true love':'fail-idiot',
'olive garden':'warn-idiot','artisinal':'fail-idiot','hand crafted':'fail-idiot','hand-crafted':'fail-idiot',
'all natural':'fail-idiot','internet explorer isnt that bad':'warn-idiot','adobe makes great software':'fail-idiot',
'god i love dennys':'warn-idiot','dennys is a great restaurant':'fail-idiot','dennys':'warn-idiot',
'red lobster':'warn-idiot','red lobster has great seafood':'fail-idiot','red lobster serves great seafood':'fail-idiot',
'restore america':'fail-idiot','waffle house':'warn-idiot',
};

module.exports.controller = function(app) {

  app.post("/tweets/:id", function(req, res) {
    console.log(typeof req.params.id);
    console.log(req.params.id);
    let tweetToVet = req.params.id;
    let tweetArray = tweetToVet.split(' ');
    console.log(tweetArray);

    let nextTweet = new Tweet({
      body: tweetToVet,
      date: Date.now(),
      sent: false,
      flags: []
    });

    // regex sweep and lowerCase function are happening AFTER model!
    // these changes are not being saved when the model gets .save() on it
    console.log('Word array before entering loop = ' + tweetArray);

    for (var i = 0; i < tweetArray.length; i++) {
      console.log('Now entering loop number ' + i);
      let phraseBank = ['','','','','',''];
      phraseBank[0] = tweetArray[i];
      console.log('tweetArray number ' + i + ' is ' + tweetArray[i]);

      // if (tweetArray[i + 1]) {
      //   phraseBank[1] = phraseBank[0] + ' ' + tweetArray[i + 1];
      // }
      // if (tweetArray[i + 2]) {
      //    phraseBank[2] = phraseBank[1] + ' ' + tweetArray[i + 2];
      // }
      // if (tweetArray[i + 3]) {
      //    phraseBank[3] = phraseBank[2] + ' ' + tweetArray[i + 3];
      // }
      // if (tweetArray[i + 4]) {
      //    phraseBank[4] = phraseBank[3] + ' ' + tweetArray[i + 4];
      // }
      // if (tweetArray[i + 5]) {
      //    phraseBank[5] = phraseBank[4] + ' ' + tweetArray[i + 5];
      // }
      phraseBank[1] = phraseBank[0] + ' ' + tweetArray[i + 1];
      phraseBank[2] = phraseBank[1] + ' ' + tweetArray[i + 2];
      phraseBank[3] = phraseBank[2] + ' ' + tweetArray[i + 3];
      phraseBank[4] = phraseBank[3] + ' ' + tweetArray[i + 4];
      phraseBank[5] = phraseBank[4] + ' ' + tweetArray[i + 5];


      console.log('i value is ' + i);
      console.log('phrase bank = ' + phraseBank);

      for (var n = 0; n < phraseBank.length; n++) {
        if (_.has(flags, phraseBank[n])){
          nextTweet.flags.push({});
          let target = nextTweet.flags[nextTweet.flags.length - 1];
          target[phraseBank[n]] = flags[phraseBank[n]];
        } else {
          console.log('I did not push anything to flags for i: ' + i + ',n:' + n + '.');
        }// end if statement
      } // end inner for loop

    }// end outer for loop

    nextTweet.save();
    res.send(nextTweet);
  });


  // app.post("/", function(req, res) {
  //
  // });
  //
  // app.put("/", function(req, res) {
  //
  // });
  //
  // app.delete("/", function(req, res) {
  //
  // });


};
