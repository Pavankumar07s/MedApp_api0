const express = require("express");
const {
  createUser,
  getUser,
  externalApiCall,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);
router.post("/aadharVerify", externalApiCall);

module.exports = router;
