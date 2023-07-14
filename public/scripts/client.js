/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global $ document*/
$(document).ready(function() {

  //Dummy tweet Object from the initial-tweet.json
  // const tweetArticle = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];

  //Function to createTweet Element dynamically and append to the tweet section
  const createTweetElement = (tweetObject) => {
    const user = tweetObject.user;
    const content = tweetObject.content;

    //tweet template
    const article = (`
  <article class='tweet'> 
     <header>
          <span>
            <img src=${user.avatars} alt="picture of avatar">
            <span>${user.name}</span>
          </span>
          <span id="username">${user.handle}</span>
        </header>
        <div>
          <p>${content.text}</p>
        </div>
        <hr>
        <footer>
          <span>${tweetObject.created_at}</span>
          <span class="images">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </span>
        </footer>
  </article> 
  `);

    return article;
  };


  // Function that appends tweets to the tweet container.
  const renderTweets = (tweetData) => {
    $('.tweet-container').empty();
    tweetData.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    });
  };

  // renderTweets(tweetArticle);

  $('.post-tweet').on("submit", function(event) {
    event.preventDefault();
    const data = $('.post-tweet').serialize();
    $.post("/tweets", data).then(() => {
      loadTweets();
    });
  });

  const loadTweets = function() {

    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function(data) {
        renderTweets(data);
      },
      error: function(err) {
        console.log(err);
      }
    });

  };

});