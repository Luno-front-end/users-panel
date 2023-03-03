const { Schema, model } = require("mongoose");

const Organization = new Schema({
  name: { type: String, unique: true, required: true },
});

module.exports = model("Organization", Organization);
