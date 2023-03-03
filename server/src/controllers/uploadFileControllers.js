const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "../files");
const File = require("../models/File");
const User = require("../models/User");

const uploadFile = async (req, res) => {
  try {
    const resFile = req.files.file;
    const type = resFile.name.split(".").pop();

    const file = new File({
      name: resFile.name,
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
        },
      }
    );

    fs.mkdirSync(dirPath + `/${req.user.id}`);
    const path = dirPath + `/${req.user.id}/${resFile.name}`;
    await resFile.mv(path);

    res.status(200).json({ message: "Файл був прийнятий" });
  } catch (e) {
    res.status(500).json({ message: "Файл не був отриманий" });
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await File.findOne({ _id: req.query.id, user: req.user.id });
    console.log(file.path);
    // console.log(`${file.path}/${file.name}`);

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
    res.status(500).json({ message: "Помилка оттримання файлів" });
  }
};

module.exports = { uploadFile, downloadFile, getFile };
