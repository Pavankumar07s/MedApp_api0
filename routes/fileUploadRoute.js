const express = require("express");
const upload = require("../configFileUpload/multerConfig");

const { fileUpload } = require("../controllers/fileUpload");

const router = express.Router();

router.post("/", upload.single("file"), fileUpload);

module.exports = router;
