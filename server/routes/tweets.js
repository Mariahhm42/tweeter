"use strict";

const userHelper = require("../lib/util/user-helper");
const express = require("express");
const tweetsRoutes = express.Router();

module.exports = function (DataHelpers) {
  // GET route to serve the main HTML page with tweets
  tweetsRoutes.get("/", function (req, res) {
    console.log("Rendering tweetsPage.ejs...");
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        console.error("Error loading tweets:", err);
        res.status(500).send("Error loading tweets.");
      } else {
        console.log("Tweets fetched:", tweets);
        res.render("tweetsPage", { tweets });
      }
    });
  });
    

  // POST route to handle new tweets
  tweetsRoutes.post("/", function (req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: "Invalid request: no data in POST body" });
      return;
    }

    const newTweet = {
      user: {
        name: req.body.name || userHelper.generateRandomUser().name,
        handle: req.body.handle || userHelper.generateRandomUser().handle,
        avatars: req.body.avatars || userHelper.generateRandomUser().avatars,
      },
      content: { text: req.body.text },
      created_at: Date.now(),
    };

    DataHelpers.saveTweet(newTweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(newTweet);
      }
    });
  });

  return tweetsRoutes;
};
