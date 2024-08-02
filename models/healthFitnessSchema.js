const mongoose = require("mongoose");

const healthFitnessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  spo2: {
    type: Number,
    required: true,
  },
  heartRate: {
    type: Number,
    required: true,
  },
  steps: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  waterConsumption: {
    type: Number,        //yaha liters main dalna
    required: true, 
  },
  protein: {
     type: Number,   // yaha pe gm main dalna
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HealthFitness = mongoose.model("HealthFitness", healthFitnessSchema);
module.exports = HealthFitness;
