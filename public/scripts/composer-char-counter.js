$(document).ready(function() {
  console.log("composer-char-counter.js has been loaded successfully!");
  const $textarea = $(".new-tweet textarea"); // Select the textarea element inside the .new-tweet section
  $textarea.on("input", function() { // Register an event handler for the 'input' event
    console.log("Event triggered!");
    // 'this' refers to the textarea element
    const inputText = $(this).val(); // Get the current value of the textarea
    const remainingCharacters = 140 - inputText.length; // Calculate remaining characters
    console.log(`Characters left: ${remainingCharacters}`);
    // Update the counter output
    const $counter = $(this).closest("form").find(".counter");
    $counter.text(remainingCharacters);
    // Add or remove red styling when the count is negative
    if (remainingCharacters < 0) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "black");
    }
  });
});
