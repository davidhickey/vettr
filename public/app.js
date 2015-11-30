'use strict';
const WARN = 'warn-idiot';
const FAIL = 'fail-idiot';
let warningCount = 0;
let failCount = 0;
let dataBox;
let tweetMax = 140;
let lastTweetID;
let $stupidContentDiv = $("#stupid-content");
let username;
// testing alternative:
// let username = 'butt';
let messages = ['\'Cause You Might Be An Asshole','Hide Your Idiocy From The World','Don\'t Fuck Up In Public!',
'Never Pass Up A Good Opportunity To Edit Yourself','It Was Funnier In Your Head','Maybe Write It On A Bathroom Stall Instead',
'Your Followers Will Thank You','No One Really Wants To Hear It','You\'re Not A Special Snowflake',
'Not On Twitter, Man, Not On Twitter','We Save You From Yourself','So You Don\'t Have To Deny It Later', "Would You Talk To Your Mother Like That?",
"This Will Most Likely Not Make The World A Better Place", "Don't Give Your Enemies Ammo"];

$( ()=>{
  let $counter = $('#counter-field');
  let $tweetBox = $('#tweet-box');
  let $message = $('#message');
  let $sendButton = $('#send-button');
  let $rightContent = $('#right-content');
  let $loginLink = $('#login-link');
  $rightContent.hide();
  $sendButton.hide();
  $message.html(getMessage());

  setInterval(function(){ $counter.html('Character Count: ' + $tweetBox.val().length); }, 100);

  // set up ajax listener on main button
  console.log('loaded yer page, breh');

  $.ajax('/username').done((data)=>{
    console.log('checking for login');
    if (data){
      username = data;
      console.log(username);
    }
  });

  if (username){
    $('#login-button').remove();
    $loginLink.remove();
    // $('#logged-in-label').attr("for","Logged in as " + username);
    $('#logged-in-label').html("Logged in as " + username);
  }


  $('#vet-button').click( ()=>{
    let $tweet = $tweetBox.val();
    console.log($tweet);

    if ($tweet.length > tweetMax){
      alert('That tweet is too long, breh!');
      return;
    };

    $.ajax('/tweets/' + processTweet($tweet),{method: 'post'}).done((data)=>{
      console.log(data);
      dataBox = data;
      lastTweetID = dataBox._id;

      $stupidContentDiv.empty();
      warningCount = 0;
      failCount = 0;

        if (dataBox.flags.length > 0){
          let $newUL = $('<ul></ul>');
          $newUL.addClass('warning-list');
          let $summaryDiv = $('<div></div>');
          $summaryDiv.addClass('summary-div');
          let $newP = $('<p></p>');
          $newP.addClass('totals')

          for (var i = 0; i < dataBox.flags.length; i++) {
            for (var key in dataBox.flags[i]){
              // flags key => key
              // flags value => dataBox.flags[i][key]

              let statusString
              if (dataBox.flags[i][key] === WARN) {
                statusString = 'a warning';
                warningCount++;
              } else if (dataBox.flags[i][key] === FAIL) {
                statusString = 'an instant fail';
                failCount++;
              }

              let newLIString = '\"' + key + '\" gets you ' + statusString + '.'
              $newUL.append($('<li></li>').html(newLIString));

            }// end inner for (key in object) loop
          }// end outer for loop
          $stupidContentDiv.append($newUL);
          $newP.html('Warnings: ' + warningCount + ' Fails: ' + failCount);
          $summaryDiv.append($newP);
          $stupidContentDiv.append($summaryDiv);
          $rightContent.fadeIn(800);
          $sendButton.fadeIn(800);
          //assign click event to send button
          $sendButton.click( () => {
            console.log('clicked send');
            $.ajax('/tweets/send/' + prepareTweet($tweet),{method: 'post'}).done((data)=>{
              console.log('sent to tweets/send/');
            })
          });
        } else {
          $stupidContentDiv.append($('<p>Your tweet passes the test!</p>').addClass('totals'));
          $rightContent.fadeIn(800);
          $sendButton.fadeIn(800);
          //assign click event to send button
          $sendButton.click( () => {
            console.log('clicked send');
            $.ajax('/tweets/send/' + prepareTweet($tweet),{method: 'post'}).done((data)=>{
              console.log('sent to tweets/send/');
            })
          });
        } //end else statement
    });

  }); //close vet-button click event



});// end on doc-load anonymous function

let processTweet = function(tweet){
  tweet = tweet.replace(/[^\w\s]|_/g, "");
  tweet = tweet.toLowerCase();
  tweet.split(' ').join('+');
  console.log(tweet);
  return tweet;
};

let prepareTweet = function(tweet){
  tweet.split(' ').join('&');
  console.log(tweet);
  return tweet;
};

let getMessage = function(){
  let index = Math.ceil(Math.random() * messages.length);
  return messages[index];
}
