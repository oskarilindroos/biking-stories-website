const express = require("express");
const userControllers = require("../controllers/user-controllers");

// Create route for users
const router = express.Router();

router.get("/", userControllers.getAllUsers);
router.get("/:_id", userControllers.getUserById);
router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);

module.exports = router;
