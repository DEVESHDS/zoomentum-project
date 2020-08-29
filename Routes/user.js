const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const mongoose = require("mongoose");

router.post("/user", (req, res) => {
  const user = new User({
    username: req.body.username,
  });

  User.create(user)
    .then(() => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
