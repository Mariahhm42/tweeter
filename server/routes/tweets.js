"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();
const jquery = require("jquery");

module.exports = function(DataHelpers) {

  // Route to fetch all tweets
tweetsRoutes.get("/", function(req, res) {
  DataHelpers.getTweets((err, tweets) => {
    if (err) {
      console.error("Error fetching tweets:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(tweets); // Return all tweets as JSON
    }
  });
});

// Route to create a new tweet
tweetsRoutes.post("/", function(req, res) {
  // Validate that the text is present and within limits
  if (!req.body.text || req.body.text.length > 140) {
    res.status(400).json({ error: 'invalid request: missing or invalid tweet text' });
    return;
  }

  // Generate user if not provided
  const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
  const tweet = {
    user: user,
    content: {
      text: req.body.text
    },
    created_at: Date.now()
  };

  // Save the tweet using DataHelpers
  DataHelpers.saveTweet(tweet, (err) => {
    if (err) {
      console.error("Error saving tweet:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(tweet); // Respond with the newly created tweet
    }
  });
});


  return tweetsRoutes;

}