const Story = require("../models/story-model");

exports.getAllStories = async (req, res, next) => {
  try {
    const stories = await Story.find();

    if (stories.length === 0) {
      return res.status(404).json({ message: "No stories found" });
    } else {
      return res.status(200).json({ stories: stories });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

exports.getStoryByUid = async (req, res, next) => {
  const uid = req.params.uid; // Get the user's id from the url params

  try {
    // Find all stories where the uid matches
    const stories = await Story.find({ uid: uid });
    console.log(stories);
    if (stories.length === 0) {
      throw Error();
    }
    return res.status(200).json({ stories: stories });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "No stories found for that user id" });
  }
};

exports.create = async (req, res, next) => {
  const story = new Story({
    date: req.body.date,
    name: req.userInfo.name,
    uid: req.userInfo.uid,
    city: req.body.city,
    location: req.body.location,
    text: req.body.text,
    img: req.body.img,
  });

  try {
    const createdstory = await story.save();
    console.log(createdstory);
    return res.status(201).json({ message: "Story created succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating story" });
  }
};
