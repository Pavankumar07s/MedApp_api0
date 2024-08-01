const mongoose = require("mongoose");

const Payment = new mongoose.Schema({
  id: String,
  amount: Number,
  currency: String,
  status: String,
});

module.exports = mongoose.model("Payment", Payment);
