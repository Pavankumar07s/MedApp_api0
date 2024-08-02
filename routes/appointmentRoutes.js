const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointmentSchema");
const authMiddleware = require("../middlewares/authMiddleware");

// Create an appointment
router.post("/", authMiddleware, async (req, res) => {
  const { doctorId, appointmentDate } = req.body;
  const userId = req.user._id;

  try {
    const appointment = new Appointment({
      userId,
      doctorId,
      appointmentDate,
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get appointments for a user
router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const appointments = await Appointment.find({ userId });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Get all appointments for a user
router.get("/user/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const appointments = await Appointment.find({ userId });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all appointments for a doctor
router.get("/doctor/:doctorId", authMiddleware, async (req, res) => {
  const { doctorId } = req.params;

  try {
    const appointments = await Appointment.find({ doctorId });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
