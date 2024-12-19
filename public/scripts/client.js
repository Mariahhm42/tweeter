/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Function to create a single tweet element
  const createTweetElement = function (tweet) {
    const timeAgo = timeago.format(tweet.created_at); // Use timeago.format to display time passed
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

  // Function to render tweets
  const renderTweets = function (tweets) {
    const $tweetsContainer = $("#tweets-container");
    $tweetsContainer.empty(); // Clear existing tweets
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $tweetsContainer.prepend($tweetElement); // Prepend new tweets
    }
  };

   // Function to escape potentially unsafe text for security (e.g., prevent XSS)
   const escape = function (text) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  };

  // Function to load tweets via AJAX
  const loadTweets = function () {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function (err) {
        console.error("Error loading tweets:", err);
      },
    });
  };
  // Form submission event handler
  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const tweetText = $("#tweet-text").val().trim();

    // Validation
    if (!tweetText) {
      alert("Your tweet cannot be empty!");
      return;
    }
    if (tweetText.length > 140) {
      alert("Your tweet exceeds the maximum length of 140 characters!");
      return;
    }

    // Send AJAX POST request
    const formData = $(this).serialize(); // Serialize form data
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: formData,
      success: function () {
        $("#tweet-text").val(""); // Clear the textarea
        loadTweets(); // Reload tweets
      },
      error: function (err) {
        console.error("Error posting tweet:", err);
      }
    });
  });

  // Initial load of tweets on page load
  loadTweets();
});