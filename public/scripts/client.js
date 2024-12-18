/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
    // Function to safely escape text to prevent XSS attacks
    const escape = function (str) {
      const div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    // Function to create a tweet element (HTML structure) dynamically
    const createTweetElement = function(tweet) {
      // Destructure tweet object for readability
      const { name, avatars, handle } = tweet.user;
      const { text } = tweet.content;
      const createdAt = tweet.created_at;
      // Construct tweet HTML using template literals
      const $tweet = $(`
        <article class="tweet">
          <header>
            <div class="user-info">
              <img src="${avatars}" alt="User Avatar">
              <h4>${escape(name)}</h4>
            </div>
            <span class="handle">${escape(handle)}</span>
          </header>
          <p class="tweet-content">${escape(text)}</p>
          <footer>
            <span class="timestamp">${timeago.format(createdAt)}</span>
            <div class="tweet-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
      `);
  
      return $tweet;
    };
  
    // Function to render all tweets in the #tweets-container
    const renderTweets = function(tweets) {
    const $tweetsContainer = $("#tweets-container");
  
      // Empty container before appending new tweets
      $tweetsContainer.empty();
  
      // Loop through each tweet and append to the container
      for (const tweet of tweets) {
        const $tweetElement = createTweetElement(tweet);
        $tweetsContainer.append($tweetElement);
      }
    };
  
    // Fake tweet data (as provided)
    const data = [
      {
        "user": {
          "name": "Gift",
          "avatars": "https://i.imgur.com/73hZDYK.png",
          "handle": "@WineLover"
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
    ];

    renderTweets(data);
  
  });
  