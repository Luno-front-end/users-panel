const { Schema, model } = require("mongoose");

const User = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  nickname: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  organizationName: { type: String, ref: "Organization" },
});

module.exports = model("User", User);
