const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

// Finds all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    // If no users are found
    if (users.length === 0) {
      res.status(404).json({ message: "No users found" });
    } else {
      res.status(200).json({ users: users });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error });
  }
};

// Find user by _id in database
exports.getUserById = async (req, res, next) => {
  const _id = req.params._id; // Store the Rser id from url
  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res.status(200).json({ user: user });
    }
  } catch (error) {
    console.log(error);

    if (error.name === "CastError") {
      return res
        .status(500)
        .json({ error: `User id must be of type: ${error.kind}` });
    }
    res.status(500).json({ error: error });
  }
};

// User sign up
exports.signup = async (req, res, next) => {
  // Check that the password is at least 6 characters before hashing
  if (req.body.password.length < 6) {
    return res
      .status(403)
      .json({ error: "Password must be at least 6 characters" });
  }

  // Hash password
  let passwordHashed;
  try {
    passwordHashed = await bcrypt.hash(req.body.password, 12);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Could not hash password" });
  }

  // Create user object from request body
  const createdUser = new User({
    email: req.body.email,
    password: passwordHashed,
    name: req.body.name,
    city: req.body.city,
    birthyear: req.body.birthyear,
    profilePictureURL: req.body.profilePictureURL,
  });

  // Save user to database
  try {
    const user = await createdUser.save();
    res.status(201).json({
      message: "User created",
      user: createdUser,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      res.status(403).json({ error: "User with that email already exists" });
    } else {
      res.status(500).json({ error });
    }
  }
};
