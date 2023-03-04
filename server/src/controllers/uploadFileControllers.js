const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "../files");
const File = require("../models/File");
const User = require("../models/User");

const uploadFile = async (req, res) => {
  try {
    const resFile = req.files.file;
    const type = resFile.name.split(".").pop();
    const decodedFileName = decodeURIComponent(resFile.name);
    const delSpace = decodedFileName.replace(/ /g, "_");
    console.log(delSpace);
    const file = new File({
      name: delSpace,
      type,
      path: dirPath + `/${req.user.id}`,
      user: req.user.id,
    });

    await file.save();

    const thisFile = await File.findOne({ user: req.user.id });

    await User.updateOne(
      { _id: req.user.id },
      {
        $set: {
          file: thisFile._id,
          fileName: thisFile.name,
        },
      }
    );

    fs.mkdirSync(dirPath + `/${req.user.id}`);
    const path = dirPath + `/${req.user.id}/${delSpace}`;
    await resFile.mv(path, "utf8");

    res.status(200).json({ file: thisFile });
  } catch (e) {
    res.status(500).json({ message: "Файл не був отриманий" });
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await File.findOne({ _id: req.query.id, user: req.user.id });

    return res.download(file.path + `/${file.name}`);
  } catch (e) {
    res.status(500).json({ message: "Помилка завантаження" });
  }
};

const getFile = async (req, res) => {
  try {
    const file = await File.findOne({ _id: req.query.id });

    return res.json({ file });
  } catch (e) {
    res.status(500).json({ message: "Помилка отримання файлів" });
  }
};

module.exports = { uploadFile, downloadFile, getFile };
