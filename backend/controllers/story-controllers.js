const Story = require("../models/story-model");

exports.getStoryByUid = async (req, res, next) => {
  const uid = req.params.uid; // Get the user's id from the url params

  try {
    // Find all stories where the uid matches
    const stories = await Story.find({ uid: uid });
    if (stories.length === 0) {
      throw Error();
    }
    res.status(200).json({ stories });
    console.log(stories);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "No stories found for that user id" });
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
    res.status(201).json({ message: "Story created succesfully" });
    console.log(createdstory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating story" });
  }
};
