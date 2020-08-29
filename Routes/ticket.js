const express = require("express");
const router = express.Router();
const Ticket = require("../models/user.js");
const mongoose = require("mongoose");

router.post("/newticket", (req, res) => {
  let name = req.body.username;
  let phonenum = req.body.phone;
  let date = new Date(req.body.date);
  let newticket = new Ticket({
    username: name,
    phone: phonenum,
    date: date,
  });
  Ticket.create(newticket)
    .then(() => {
      console.log("successfuly created a new ticket");
      res.status(200).send(newticket);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
