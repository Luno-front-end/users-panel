const User = require("../models/User");
const Organization = require("../models/Organization");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const File = require("../models/File");

const generateAccessTocken = (id, email) => {
  const payload = {
    id,
    email,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
};

const registration = async (req, res) => {
  try {
    const valid = validationResult(req);
    if (!valid.isEmpty()) {
      return res.status(400).json({
        message: "Щось пішло не так, спробуйте ще раз зареєструватися",
        valid,
      });
    }
    const { firstname, lastname, nickname, email, password, nameOrganization } =
      req.body;
    const checkNickname = await User.findOne({ nickname });
    const checkEmail = await User.findOne({ email });
    const orgTest = new Organization({ name: nameOrganization });

    if (checkNickname || checkEmail) {
      return res
        .status(400)
        .json({ message: "Користувач з таким імʼям або нікнеймом вже існує" });
    }
    const heshPass = bcrypt.hashSync(password, 5);

    await orgTest.save();

    const organizationName = await Organization.findOne({
      name: nameOrganization,
    });

    const createUser = new User({
      firstname,
      lastname,
      nickname,
      email,
      password: heshPass,
      organizationName: organizationName.name,
    });
    await createUser.save();

    const loginUser = await login(req, res);
    return loginUser;
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error registration" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "Такого корисувача не існує, спробуйте ще раз, або зареєструйтеся",
      });
    }
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      return res.status(400).json({
        message: "Пароль не вірний",
      });
    }

    const token = generateAccessTocken(user._id, email);
    return res.json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        nickname: user.nickname,
        email: user.email,
        organizationName: user.organizationName,
        file: user.file,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error login" });
  }
};

const auth = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    const token = generateAccessTocken(user._id, user.email);

    return res.json({
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        nickname: user.nickname,
        email: user.email,
        organizationName: user.organizationName,
        file: user.file,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error auth" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ users });
  } catch (e) {}
};

module.exports = { registration, login, getUsers, auth };
