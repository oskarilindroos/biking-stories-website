const Story = require("../models/story-model");
const jwt = require("jsonwebtoken");

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
