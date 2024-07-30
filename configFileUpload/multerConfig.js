const multer = require("multer");

const storage = multer.diskStorage({
  // destination: function (req, res, cb) {
  //   cb(null, "../TempFileStore");
  // },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
