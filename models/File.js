const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('File', FileSchema);
