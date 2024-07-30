const File = require("../models/File");
const cloudinary = require("../configFileUpload/cloudinaryConfig");
exports.fileUpload = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

    const newFile = new File({
      url: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await newFile.save();
    res
      .status(200)
      .send({ message: "File uploaded successfully", url: result.secure_url });
  } catch (err) {
    res.status(500).send({ error: "File upload failed", details: err.message });
  }
};
