const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "plz provide username"],
    minlength: 2,
  },
  email: {
    type: String,
    required: [true, "plz provide email"],
  },
  password: {
    type: String,
    required: [true, "plz provide email"],
    maxlength: 8,
  },
  role:{
    type:String,
    enum:['admin','user'],
    default:'user'
  }
});

module.exports = mongoose.model("user", userSchema);