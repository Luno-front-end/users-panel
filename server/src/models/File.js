const { Schema, model, ObjectId } = require("mongoose");

const File = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  path: { type: String, required: true, default: "" },
  user: { type: ObjectId, ref: "User" },
});

module.exports = model("File", File);
