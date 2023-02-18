
const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    Name: String,
    MobileNumber: String,
  });

   const UserModel = mongoose.model("Users", userSchema);

  module.exports = UserModel;