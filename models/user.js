const mongoose = require("mongoose");
let user = new mongoose.Schema({
  username: { type: String, required: true },
});

module.exports = mongoose.model("User", user);
