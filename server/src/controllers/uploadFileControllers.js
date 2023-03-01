const uploadFile = async (req, res) => {
  try {
    const file = req.files.file;
    const userDir = await File.findOne({
      user: req.user.id,
      _id: req.body.parent,
    });
  } catch (e) {}
};

module.exports = { uploadFile };
