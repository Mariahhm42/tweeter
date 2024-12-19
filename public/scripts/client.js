/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Function to create a single tweet element
  const createTweetElement = function (tweet) {
    const timeAgo = timeSince(tweet.created_at); // Assume a timeSince function is defined
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

  // Function to escape text for security
  const escape = function (text) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  };

  // Event listener for form submission
  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const serializedData = $(this).serialize(); // Serialize form data
    console.log("Serialized data:", serializedData);

    const tweetText = $("#tweet-text").val().trim(); // Get the input text
    if (!tweetText) {
      alert("Your tweet cannot be empty!");
      return;
    } else if (tweetText.length > 140) {
      alert("Your tweet exceeds the 140 character limit!");
      return;
    }

    // AJAX POST request to submit the tweet
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: serializedData,
      success: function () {
        console.log("Tweet successfully posted!");
        $("#tweet-text").val(""); // Clear input field
        loadTweets(); // Reload tweets
      },
      error: function (err) {
        console.error("Error posting tweet:", err);
      },
    });
  });

  // Load tweets on page load
  loadTweets();
});
