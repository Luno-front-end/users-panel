const User = require("../models/User");
const Organization = require("../models/Organization");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const generateAccessTocken = (id, email) => {
  const payload = {
    id,
    email,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
};

const registration = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", "*");

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

    if (checkNickname || checkEmail) {
      return res
        .status(400)
        .json({ message: "Користувач з таким імʼям або нікнеймом вже існує" });
    }
    const heshPass = bcrypt.hashSync(password, 5);

    const orgTest = new Organization({ name: nameOrganization });
    await orgTest.save();

    const organizationName = await Organization.findOne({
      name: nameOrganization,
    });

    const user = new User({
      firstname,
      lastname,
      nickname,
      email,
      password: heshPass,
      organizationName: organizationName.name,
    });
    await user.save();
    return res.status(201).json({ message: "User created" });
  } catch (e) {
    console.log(e);
    res.status(400).json("Nooooo");
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
    return res.json({ token });
  } catch (e) {
    console.log(e);
    res.status(400).json("Nooooo");
  }
};
const getUsers = async (req, res) => {
  try {
    res.json("Okeeey");
  } catch (e) {}
};

module.exports = { registration, login, getUsers };
