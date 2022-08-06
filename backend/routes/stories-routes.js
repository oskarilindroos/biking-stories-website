const express = require("express");
const storyControllers = require("../controllers/story-controllers");
const checkAuth = require("../middleware/auth-check");
// luodaan tänne reititys users resurssille
const router = express.Router();

router.get("/user/:uid", storyControllers.getStoryByUid);

router.use(checkAuth);

router.post("/", storyControllers.create);

module.exports = router;
