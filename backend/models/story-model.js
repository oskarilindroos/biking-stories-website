const mongoose = require("mongoose");
const User = require("./user-model");

const storySchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, default: Date.now() },
    name: { type: String, required: true },
    uid: { type: mongoose.Types.ObjectId, required: false, ref: "User" },
    city: { type: String, required: false },
    location: { type: String, required: true },
    text: { type: String, required: true },
    img: { type: String, required: false },
  },
  { collection: "stories" }
);

module.exports = mongoose.model("Story", storySchema);
