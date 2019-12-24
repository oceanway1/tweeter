/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function () {

  //This function escapes XSS(cross-site scripting)
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };




  // This function takes in objects as parameters. Then render it into html form. Also use moment.js for Time
  const createTweetElement = function (tweet) {
    const $tweet = `
  <article class="tweet">
    <header class="container-tweet">
      <div  class="container-tweet">
        <img class="h-image" src=${tweet.user.avatars}/>
        <span class="h-name">${tweet.user.name}</span>
        </div>
        <span class="h-aname">${tweet.user.handle}</span>
    </header>
    <main>${escape(tweet.content.text)}</main>
    <footer>
      <div class="container">
       ${moment(tweet.created_at).fromNow()}
        <span class="footer-right">
        <i class='fa fa-flag'></i>
        <i class='fa fa-retweet'></i>
        <i class='fa fa-heart'></i>
      </span>
      </div>
    </footer>
  </article>

`;
    return $tweet;
  };


  // renderTweets(data)
  const renderTweets = function (tweets) {
    $(".tweet-container").empty();
    for (let x of tweets) {
      $tweet = createTweetElement(x)
      $(".tweet-container").prepend($tweet)
    }
  }


  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .then(function (newTweet) {
        renderTweets(newTweet);
      });
  };

  loadTweets();


  // create error element
  const $error = $(".error");
  const $errMessage = $('.err-message');
  $error.hide();

  const $newTweet = $(".new-tweet");
  $newTweet.hide();
  const $newTweetButton = $(".new-tweet-button");
  // Toggle the display of the button
  $newTweetButton.on("click", function () {
    $newTweet.slideToggle();
    $("textarea").val('').focus();
  })





  
  const $newTweetSubmit = $("form");
  $newTweetSubmit.submit(function (event) {
    event.preventDefault();
    const tweetLength = $("textarea").val().length;
    const newTweet = $("textarea").val();
    if (newTweet === "") {
      $errMessage.text("Tweet can not be empty, please enter your Tweet below");
      $error.slideDown();
      return;
    }
    if (tweetLength > 140) {
      $errMessage.text("Only 140 characters allowed.");
      $error.slideDown();
      return;
    }
    const result = { text: newTweet }
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: result,
      success: function () {
        $('.tweet-container').empty(); // clear the tweets
        loadTweets(); // reloading the tweets 
      }
    })
      .done(function (textStatus) {
        console.log('done:', textStatus);
        $error.hide();
        $('.new-tweet').hide();
        $error.slideUp();
      });
  })
})











