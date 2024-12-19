/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
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
  ];
  
  // Function to create a single tweet element
  const createTweetElement = function(tweet) {
    // Use template literals to construct the tweet's HTML structure
    const timeAgo = timeSince(tweet.created_at); // Custom function to convert timestamp to a readable format
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img class="avatar" src="${tweet.user.avatars}" alt="User Avatar">
            <h4>${tweet.user.name}</h4>
            <span class="handle">${tweet.user.handle}</span>
          </div>
        </header>
        <p class="tweet-content">
          ${escape(tweet.content.text)} <!-- Escaping text for security -->
        </p>
        <footer>
          <span class="timestamp">${timeAgo}</span>
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
  
  // Function to render multiple tweets
  const renderTweets = function(tweets) {
    // Empty the container before rendering to avoid duplication
    $('#tweets-container').empty();
  
    // Loop through each tweet object, generate its DOM element, and append to container
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $('#tweets-container').append($tweetElement);
    }
  };
  
  // Function to escape text for security (e.g., to prevent XSS attacks)
  const escape = function(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  };
  
  // Helper function to convert timestamps to "time ago" format
  const timeSince = function(timestamp) {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
  
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 }
    ];
  
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };
  
  // Render tweets using the fake data
  renderTweets(data);
  