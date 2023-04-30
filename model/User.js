const mongoose = require("mongoose");
<<<<<<< HEAD
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
=======
const validator = require("validator")
>>>>>>> 854c4afe2605e78112016f87686d81509ea88685

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "plz provide username"],
    minlength: 2,
  },
  email: {
    type: String,
<<<<<<< HEAD
    validate: {
      validator: validator.isEmail,
      message: "please provide valid email",
    },
    required: [true, "plz provide email"],
    unique: true,
=======
    validate:{
        validator:function(input){
         return validator.isEmail(input)
        },
        message:"please provide valid email"
    },
    required: [true, "plz provide email"],
    unique:true
>>>>>>> 854c4afe2605e78112016f87686d81509ea88685
  },
  password: {
    type: String,
    required: [true, "plz provide email"],
    maxlength: 8,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.methods.comaparePasswords = async function (candidatePassword) {
  // candidate password is the passowrd user trying to login with,
  // this.password is the hashed password coming from mongodb
  return await bcrypt.compare(candidatePassword, this.password);
};

// userSchema.methods.createJWT = async function () {
//   const token = await jwt.sign(
//     { userId: this._id, name: this.name, role: this.role },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_LIFETIME }
//   );
//   return token;
// };

module.exports = mongoose.model("user", userSchema);
