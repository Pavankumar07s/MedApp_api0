const express = require("express");
const { OTPgenerator } = require("../controllers/otpController");

const router = express.Router();

router.get("/", OTPgenerator);

module.exports = router;
