/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

//This function takes in an array of objects, reverses its order and then transform each element 
// in the array (which should be objects) into html text;
  const createTweetElement = function(tweetData) {

  // let  $tweet = $("<article>").addClass("tweet");
  
  // create header in tweeter container
  const newDateStr = createDateString(tweetData.created_at);
  const $spanCHImage = $('<span>').addClass("h-image");
  const $img = $("<img>").attr("src", tweetData.user.avatars);
  $spanCHImage.append($img);
  const $spanHName = $('<span>').addClass("h-name");
  const $h3Name = $("<h3>").text(tweetData.user.name);
  $spanHName.append($h3Name);
  const $spanHaName = $("<span>").addClass("h-aname");
  const $h3aName = $("<h3>").text(tweetData.user.handle);
  $spanHaName.append($h3aName);
  const $header = $('<header>')
  $header.append($spanCHImage, $spanHName, $spanHaName);
  
  //create tweet message body in tweeter container
  const $pTweet = $("<p>").text(tweetData.content.text);
    
  //creat footer in tweeter container
  const $spanFLeft = $("<span>").addClass("footer-left");
  $spanFLeft.append($("<h4>").text(newDateStr));
  const $spanFRight = $("<span>").addClass("footer-right");
  const $iFlag = $("<i>").addClass("fas fa-flag").attr("style");
  const $iRetweet = $("<i>").addClass("fas fa-retweet").attr("style");
  const $iHeart = $("<i>").addClass("fas fa-heart").attr("style");
  $spanFRight.append($iFlag, $iRetweet, $iHeart);
  const $footer = $("<footer>").addClass("foot");
  $footer.append($spanFLeft, $spanFRight);

  //append header, body, and footer to container

  $tweet.append($header, $pTweet, $footer);
  console.log($tweet);
};

 



