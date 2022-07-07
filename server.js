const mongoose = require("mongoose");

const coords = require("./routes/coords");

const express = require("express");
const cors = require("cors");

var app = express()
  , server = require('http').createServer(app).listen(3900)

mongoose.connect('mongodb://localhost/codeboss911').then(() => console.log(`Connected to db...`));


app.use(express.json());
app.use(cors());
app.use("/api/coords", coords);

module.exports = server;
