const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "plz provide username"],
    minlength: 2,
  },
  email: {
    type: String,
    validate:{
        validator:function(input){
         return validator.isEmail(input)
        },
        message:"please provide valid email"
    },
    required: [true, "plz provide email"],
    unique:true
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
