document.getElementById('tweet-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission for validation
    
    const tweetInput = document.getElementById('tweet-input').value.trim();
    const errorMessage = document.getElementById('error-message');
    
    if (tweetInput === '' || tweetInput.length > 140) {
      // Show error message if input is invalid
      errorMessage.style.display = 'block';
    } else {
      // Hide error message if input is valid and proceed
      errorMessage.style.display = 'none';
      alert('Tweet submitted successfully!');
      // Here you could also clear the textarea
      document.getElementById('tweet-input').value = '';
    }
  });