const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordOTP: String,
  resetPasswordExpires: Date,
});

const Doctor = mongoose.model("Doctor", userSchema);

module.exports = Doctor;
