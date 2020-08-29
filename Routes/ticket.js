const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticket.js");
const mongoose = require("mongoose");

router.post("/newticket", (req, res) => {
  let id = req.body.userid;
  let phonenum = req.body.phone;
  let date = req.body.date;
  let newticket = new Ticket({
    userid: id,
    phone: phonenum,
    date: date,
  });
  Ticket.create(newticket)
    .then(() => {
      console.log("successfuly created a new ticket");
      console.log(newticket);
      res.status(200).send(newticket);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
