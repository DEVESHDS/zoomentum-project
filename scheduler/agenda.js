const agenda = require("agenda");
const mongoose = require("mongoose");
const Ticket = require("../models/ticket.js");

const job = new agenda({ mongo: mongoose.connection });

job.define("remove_ticket", function () {
  const expirydate = new Date(Date.now() - 8 * 60 * 60 * 1000);
  console.log("Inside job");
  Ticket.deleteMany({ timing: { $lte: expirydate } })
    .then(() => {
      console.log("JOb executed successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

(async function () {
  job.start();
  job.every("8 hour", "remove_ticket");
  console.log("Agenda is started");
})();

module.exports = job;
