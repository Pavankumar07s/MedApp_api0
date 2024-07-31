const express = require("express");
const router = express.Router();
const { fileDownload } = require("../controllers/fileDownload");
router.get("/download/:filename", fileDownload);

module.exports = router;
