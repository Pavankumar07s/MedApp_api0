exports.fileDownload = async (req, res) => {
  try {
    const file = `./uploads/${req.params.filename}`;
    res.download(file);
  } catch (e) {
    res.status(500).send({ message: req.message });
  }
};
