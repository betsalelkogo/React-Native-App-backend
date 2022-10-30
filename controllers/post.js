const Post = require("../models/post_model.js");
const getAllPosts = (req, res, next) => {
  res.send("get all posts");
};

const AddNewPost = async (req, res, next) => {
  console.log(req.body);

  const post = new Post({ message: req.body.message, sender: req.body.sender });

  try {
    newPost = await post.save();
    console.log("save post in db");
    res.status(200).send(newPost);
  } catch {
    console.log("fail to save post in db");
    res.status(400).send({ error: "fail add new post" });
  }
};
module.exports = { getAllPosts, AddNewPost };
