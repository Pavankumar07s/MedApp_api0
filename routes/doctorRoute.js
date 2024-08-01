const express = require("express");
const {
  createDoctor,
  getDoctor,
} = require("../controllers/doctorController");

const {externalApiCall}=require("../controllers/userController")
const router = express.Router();

router.post("/", createDoctor);
router.get("/", getDoctor);
router.post("/aadharVerify", externalApiCall);


module.exports = router;