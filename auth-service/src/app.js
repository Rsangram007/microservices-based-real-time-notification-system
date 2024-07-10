const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://sangram:sangram@sangram.44sfsmu.mongodb.net/auth-service"
);

app.use("/api/auth", authRoutes);

module.exports = app;
