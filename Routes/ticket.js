const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticket.js");
const mongoose = require("mongoose");

router.post("/ticket/new", (req, res) => {
  let id = req.body.userid;
  let phonenum = req.body.phone;
  let date1 = req.body.timing;
  let newticket = new Ticket({
    userid: id,
    phone: phonenum,
    timing: date1,
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

//update ticket router

router.put("/update/:id", (req, res) => {
  //   console.log(req.params);
  Ticket.findByIdAndUpdate(req.params.id, { $set: { timing: req.body.date } })
    .then((updatedticket) => {
      console.log("successfully update");
      res.status(200).send(updatedticket);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//delete a ticket router

router.delete("/delete/:id", (req, res) => {
  Ticket.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("successfully deleted");
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//Get all the tickets

router.get("/view", (req, res) => {
  console.log("inside vview router");
  Ticket.find({ timing: req.body.timing })
    .then((tickets) => {
      res.status(200).send(tickets);
    })
    .catch((err) => {
      res.send(err);
    });
});

//get  user from itcket id

router.get("/user/:id", (req, res) => {
  try {
    Ticket.findById(req.params.id)
      .populate("userid")
      .exec(function (err, ticket) {
        try {
          res.status(200).json(ticket.userid);
        } catch (error) {
          res.status(500).send(err);
        }
      });
  } catch (err) {
    res.status(500).send(err);
  }
});
//====================

module.exports = router;
