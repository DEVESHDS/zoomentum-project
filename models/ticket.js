const mongoose = require("mongoose");

let ticket = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  phone: String,
  timing: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model("Ticket", ticket);
