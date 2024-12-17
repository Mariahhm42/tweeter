$(document).ready(function() {
  // Handle the input event for the textarea
  $('#tweet-text').on('input', function() {
    // Get the current length of the tweet text
    var charCount = $(this).val().length;
    
    // Get the counter element to update
    var counter = $(this).siblings('div').find('.counter');
    // Calculate the remaining characters
    var remaining = 140 - charCount;
    // Update the counter
    counter.text(remaining);
    // Change the counter color if it exceeds the limit
    if (remaining < 0) {
      counter.addClass('over-limit');
    } else {
      counter.removeClass('over-limit');
    }
  });
});
