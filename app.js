const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const User = require("./models/user.js");
const userroute = require("./Routes/user.js");
require("dotenv").config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

app.use(userroute);

app.get("/", (req, res) => {
  res.send("welcome to the page");
});
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
