const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticket.js");
const mongoose = require("mongoose");

//==========================new ticket router

router.post("/new", (req, res) => {
  let id = req.body.userid;
  let phonenum = req.body.phone;
  let date1 = req.body.timing;
  Ticket.find({ timing: date1 }, (err, obj) => {
    if (!err && obj.length <= 20) {
      console.log("inside if condition");
      console.log(obj.length);
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
    } else {
      res
        .status(500)
        .send(
          "Tickets for this timing are not available...please try some other timing"
        );
    }
  });
});

//===========================

//update ticket router

router.put("/update/:id", (req, res) => {
  //   console.log(req.params);
  Ticket.findByIdAndUpdate(
    req.params.id,
    { $set: { timing: req.body.timing } },
    { new: true }
  )
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
      res.status(200).send("Ticket successfully deleted");
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

//get  user from ticket id

router.get("/user/:tid", (req, res) => {
  try {
    Ticket.findById(req.params.tid)
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
