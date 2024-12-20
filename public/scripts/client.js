$(document).ready(function () {
  // Function to escape potentially unsafe characters
  const escape = function (text) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  };

  // Function to create a tweet element
  const createTweetElement = function (tweet) {
    const timeAgo = timeago.format(tweet.created_at);
    return `
      <article class="tweet">
        <header>
          <div class="user-info">
            <img class="avatar" src="${tweet.user.avatars}" alt="User Avatar">
            <h4>${tweet.user.name}</h4>
            <span class="handle">${tweet.user.handle}</span>
          </div>
        </header>
        <p class="tweet-content">${escape(tweet.content.text)}</p>
        <footer>
          <span class="timestamp">${timeAgo}</span>
          <div class="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
  };

  // Function to render a single new tweet to the DOM
  const renderNewTweet = function (tweet) {
    const $tweetsContainer = $("#tweets-container");
    const $newTweet = $(createTweetElement(tweet));
    $tweetsContainer.prepend($newTweet);
  };

  // Function to render all tweets
  const renderTweets = function (tweets) {
    const $tweetsContainer = $("#tweets-container");
    $tweetsContainer.empty();
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $tweetsContainer.prepend($tweetElement);
    }
  };

  // Function to load tweets from the server
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function (err) {
        console.error("Error fetching tweets:", err);
      }
    });
  };

  // Function to display an error message
  const displayError = function (message) {
    const $errorMessage = $("#error-message");
    $errorMessage.text(message).slideDown();
  };

  // Function to hide the error message
  const hideError = function () {
    const $errorMessage = $("#error-message");
    $errorMessage.slideUp();
  };

  // Form submission handler
$("#new-tweet-form").on("submit", function (event) {
  event.preventDefault();

  const $errorMessage = $("#error-message");
  const tweetText = $("#tweet-text").val().trim();

  // Slide up the error message (if visible) before validation
  $errorMessage.slideUp();

  // Validation checks
  if (!tweetText) {
    $errorMessage.text("Tweet cannot be empty!").slideDown();
    return;
  }

  if (tweetText.length > 140) {
    $errorMessage.text("Tweet exceeds the maximum length of 140 characters!").slideDown();
    return;
  }

  $("#tweet-text").on("input", function () {
    const maxLength = 140;
    const tweetLength = $(this).val().length;
    const $counter = $(".counter");
  
    $counter.text(maxLength - tweetLength);
    if (tweetLength > maxLength) {
      $counter.addClass("counter-red");
    } else {
      $counter.removeClass("counter-red");
    }
  });
  

  // If validation passes, proceed with the form submission
  const formData = $(this).serialize();

  $.ajax({
    url: "/tweets",
    method: "POST",
    data: JSON.stringify({
      name: "Amy Mansell", // Example user name
      handle: "@AmyMansell",
      avatars: "https://i.imgur.com/xyz.png", // Avatar URL
      text: $("#tweet-text").val(), // The tweet text
    }),
    contentType: "application/json", // Important for JSON payloads
    success: function (newTweet) {
      renderNewTweet(newTweet); // Dynamically render the new tweet
      $("#tweet-text").val(""); // Clear input
      $(".counter").text(140); // Reset counter
    },
    error: function (err) {
      console.error("Error posting tweet:", err);
    },
  });
});
  // Initial load of tweets
  loadTweets();
});
