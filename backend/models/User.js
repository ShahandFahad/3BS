const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isemail");

const UserSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    otpCode: {
      type: Number,
    },
    // setting by default verified as OTP Verfication has been removed from user.js in routes
    verified: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
