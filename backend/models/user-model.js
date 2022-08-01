const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    name: { type: String, required: true },
    city: { type: String, required: false },
    birthyear: { type: Number, required: false },
    profilePictureURL: { type: String, required: false }, //TODO: Could add a default img url here
  },
  { collection: "users" }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
