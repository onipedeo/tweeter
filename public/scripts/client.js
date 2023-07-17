/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global $ document*/
$(document).ready(function() {

  //function to display time of tweet
  const formatTimestamp = function(timestamp) {
    return timeago.format(timestamp);
  };

  //Function to escape unsafe characters
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
          <p>${escape(content.text)}</p>
        </div>
        <hr>
        <footer>
          <span>${formatTimestamp(tweetObject.created_at)}</span>
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

  //check if tweet is empty or over 140 characters
  const tweetLen = () => {
    const tweetText = $(".new-tweet textarea").val();
    if (tweetText === '' || tweetText === null) {
      alert("Tweet cannot be empty");
      return false;
    } else if (tweetText.length > 140) {
      alert("Tweet content is too long");
      return false;
    } else {
      return true;
    }
  };


  $('.post-tweet').on("submit", function(event) {
    //prevents page from submitting and reloading
    event.preventDefault();
    const data = $('.post-tweet').serialize();

    //checks if tweet is valid before posting.
    const isTweetValid = tweetLen();
    if (isTweetValid) {
      $.post("/tweets", data).then(() => {
        //Clears the text in the input textarea
        $('#tweet-text').val("");
        //resets counter to 140(maxlen)
        $(".counter").text(140);
        loadTweets();
      });
    }
  });


  //Ajax call request function to /tweets to get the tweets in the db.
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
  loadTweets();
});