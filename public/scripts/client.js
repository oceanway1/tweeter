/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function (tweet) {
  let date = new Date(tweet.created_at).toDateString();
  const $tweet = `
  <main <article class="tweet">
    <header class="container-tweet">
      <div class="container-tweet">
       <img class="h-image" src=${tweet.user.avatars}/>
       <span class="h-name">${tweet.user.name}</span>
      </div>
      <span class="h-aname">${tweet.user.handle}</span>
    </header>
  ${tweet.content.text}
  <footer>
    <div class = "tweet-age">${date}<div>
      <span class="icon-span">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      </span>
    </div>
  </footer>
</article>
</main>
`;
  return $tweet;
};

const renderTweets = function (tweets) {
  for (let x of tweets) {
    $tweet = createTweetElement(x)
    $('#tweets-container').prepend($tweet)
  }
}
renderTweets(data);



