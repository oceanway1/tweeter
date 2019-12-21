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


  const createTweetElement = function (tweet) {
    let date = new Date(tweet.created_at).toDateString();
    const $tweet = `
  <article class="tweet">
    <header>
      <div>
        <span>
          <img class="h-image" src="${tweet.user.avatars}">
        </span>
        <span class="h-name">
          <h3>${tweet.user.name}</h3>
        </span>
        <span class="h-aname">
          <h3>${tweet.user.handle}</h3>
        </span>

      </div>
    </header>
    <p> ${escape(tweet.content.text)}</p>
    <footer class="foot">
      <span class="footer-left">
        <h4>${date}</h4>
      </span>
      <span class="footer-right">
        <i class='fa fa-flag'></i>
        <i class='fa fa-retweet'></i>
        <i class='fa fa-heart'></i>
      </span>
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

  const $newTweet = $(".new-tweet");
  let isNew = false;
  $newTweet.hide();

  $(".write-tweet").click(function () {
    if (!isNew) {
      $newTweet.slideToggle();
      $("textarea").val('').focus();
      $(".counter").text('140');
      isNew = true;
    }
  })


  // create error element
  const $error = $(".error");
  const $errMessage = $('.err-message');
  $error.hide();


  $(".compose-tweet").submit(function (event) {
    event.preventDefault();
    const tweetLength = $(".tweet-text").val().length;
    const newTweet = $(".tweet-text").val();
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
        isNew = false;
      });
  })
})











