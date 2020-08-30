const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const User = require("./models/user.js");
const userroute = require("./Routes/user.js");
const Ticket = require("./models/ticket.js");
const ticketroute = require("./Routes/ticket.js");
require("dotenv").config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB!");
    require("./scheduler/agenda.js");
  })
  .catch((error) => console.log(error.message));

app.use(userroute);
app.use("/ticket", ticketroute);

app.get("/", (req, res) => {
  res.send("welcome to the page");
});
app.listen(process.env.PORT || port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
