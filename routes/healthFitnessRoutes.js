const express = require("express");
const router = express.Router();
const HealthFitness = require("../models/healthFitnessSchema");
const authMiddleware = require("../middlewares/authMiddleware");

// Create a health fitness record
router.post("/", authMiddleware, async (req, res) => {
  const { spo2, heartRate, steps, calories, waterConsumption, protein } =
    req.body;
  const userId = req.user._id;

  try {
    const healthFitness = new HealthFitness({
      userId,
      spo2,
      heartRate,
      steps,
      calories,
      waterConsumption,
      protein,
    });
    await healthFitness.save();
    res.status(201).json(healthFitness);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get health fitness records for a user
router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const healthFitnessRecords = await HealthFitness.find({ userId });
    res.status(200).json(healthFitnessRecords);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
