const express = require("express");
const storyControllers = require("../controllers/story-controllers");
const checkAuth = require("../middleware/auth-check");
const router = express.Router();

router.get("/", storyControllers.getAllStories);

router.get("/user/:uid", storyControllers.getStoryByUid);

router.use(checkAuth);

router.post("/", storyControllers.create);

router.patch("/:storyid", storyControllers.patch);

module.exports = router;
