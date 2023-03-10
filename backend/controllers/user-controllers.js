const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

// Finds all users
exports.getAllUsers = async (req, res, next) => {
  try {
    // Find all users in the db, omit the password field
    const users = await User.find().select("-password");

    // If no users are found
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    } else {
      return res.status(200).json({ users: users });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

// Find user by _id in database
exports.getUserById = async (req, res, next) => {
  const _id = req.params._id; // Store the Rser id from url
  try {
    const user = await User.findById(_id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
    return res.status(500).json({ message: error });
  }
};

// User sign up
exports.signup = async (req, res, next) => {
  // Error checking
  if (req.body.password.length < 6) {
    return res.json({ message: "Password must be at least 6 characters long" });
  } else if (req.body.birthyear <= 0) {
    return res.status(422).json({ message: "Birthyear must be bigger than 0" });
  } else if (req.body.birthyear >= new Date().getFullYear()) {
    return res
      .status(422)
      .json({ message: "Birthyear must be smaller than the current year" });
  }

  // Hash password
  let passwordHashed;
  try {
    passwordHashed = await bcrypt.hash(req.body.password, 12);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not hash password" });
  }

  // Create user object from request body
  const user = new User({
    email: req.body.email,
    password: passwordHashed,
    name: req.body.name,
    city: req.body.city,
    birthyear: req.body.birthyear,
    profilePictureURL: req.body.profilepic_url,
  });

  // Save user to database
  try {
    const createdUser = await user.save();
    console.log(createdUser);
    return res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// User login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  // Find if user exists in db by email
  try {
    existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res
        .status(401)
        .json({ message: "User with that email doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  // Check if the password matches the one in db
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    } else {
      // Create token
      const token = jwt.sign(
        {
          email: existingUser.email,
          name: existingUser.name,
          _id: existingUser._id,
        },
        "secretkey", // TODO: add key to env variables
        {
          expiresIn: "1h",
        }
      );
      // Respond with the token
      return res.status(200).json({
        message: "Logged in",
        token: token,
        _id: existingUser._id,
        expiresIn: "1h",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
