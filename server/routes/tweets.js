"use strict";

const userHelper = require("../lib/util/user-helper");
const express = require("express");
const tweetsRoutes = express.Router();

module.exports = function (DataHelpers) {
  // GET route to fetch all tweets
  tweetsRoutes.get("/", function (req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  // POST route to handle new tweets
  tweetsRoutes.post("/", function (req, res) {
    // Validate request body
    if (!req.body.text) {
      res.status(400).json({ error: "Invalid request: no data in POST body" });
      return;
    }

    // Construct the new tweet object
    const newTweet = {
      user: {
        name: req.body.name || userHelper.generateRandomUser().name, // Use provided name or generate a random one
        handle: req.body.handle || userHelper.generateRandomUser().handle,
        avatars: req.body.avatars || userHelper.generateRandomUser().avatars,
      },
      content: {
        text: req.body.text,
      },
      created_at: Date.now(),
    };

    // Save the new tweet to the database
    DataHelpers.saveTweet(newTweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // Respond with the newly created tweet
        res.status(201).json(newTweet);
      }
    });
  });

  return tweetsRoutes;
};
