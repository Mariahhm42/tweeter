$(document).ready(function () {
  // Function to escape potentially unsafe characters
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // Function to create a tweet element
  const createTweetElement = function (tweet) {
    const timeAgo = timeago.format(tweet.created_at);
    const safeHTML = `
      <article class="tweet">
        <header>
          <div class="user-info">
            <img class="avatar" src="${escape(tweet.user.avatars)}" alt="User Avatar">
            <h4>${escape(tweet.user.name)}</h4>
            <span class="handle">${escape(tweet.user.handle)}</span>
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
    return safeHTML;
  };

  // Function to render a single new tweet to the DOM
  const renderNewTweet = function (tweet) {
    const $tweetsContainer = $("#tweets-container");
    const $newTweet = $(createTweetElement(tweet));
    $tweetsContainer.prepend($newTweet); // Add new tweet at the top
  };

  // Function to render all tweets
  const renderTweets = function (tweets) {
    const $tweetsContainer = $("#tweets-container");
    $tweetsContainer.empty(); // Clear existing tweets
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $tweetsContainer.prepend($tweetElement); // Append all tweets to the container
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

  // Function to display the error message
  const displayError = function (message) {
    const $errorMessage = $("#error-message");
    $errorMessage.html(`<p>${escape(message)}</p>`).slideDown();
  };

  // Function to hide the error message
  const hideError = function () {
    const $errorMessage = $("#error-message");
    $errorMessage.slideUp();
  };

  // Form submission handler
  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault();

    const tweetText = $("#tweet-text").val().trim();

    // Validation checks
    if (!tweetText) {
      displayError("Tweet cannot be empty!");
      return;
    }

    if (tweetText.length > 140) {
      displayError("Tweet exceeds the maximum length of 140 characters!");
      return;
    }

    // Slide up any previous error message
    hideError();

    const tweetData = { text: tweetText }; // Prepare JSON data

    $.ajax({
      url: "/tweets",
      method: "POST",
      contentType: "application/json", // Indicate JSON data
    data: JSON.stringify(tweetData), // Serialize as JSON
    success: function (newTweet) {
      renderNewTweet(newTweet); // Render the new tweet
      $("#tweet-text").val(""); // Clear the tweet input
      $(".counter").text(140); // Reset the character counter
    },
    error: function (err) {
      console.error("Error posting tweet:", err.responseText);
    }
    });
  });

  // Initial load of tweets
  loadTweets();
});
