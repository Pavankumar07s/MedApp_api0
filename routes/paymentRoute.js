const express = require("express");
const router = express.Router();
const {
  paymentController,
  getPaymentsOfUser,
} = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create-payment-intent", paymentController);
router.get("/user/:userId", authMiddleware, getPaymentsOfUser);

module.exports = router;
