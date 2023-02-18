const mongoose = require('mongoose');

const dotenv = require('dotenv');
require("dotenv").config();
const mongodb_url = process.env.MONGODB_URL

mongoose.set('strictQuery', false);
mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connected");
});