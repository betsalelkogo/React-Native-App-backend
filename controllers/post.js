const getAllPosts = async (req, res, next) => {
  res.send("get all posts");
};

const AddNewPost = async (req, res, next) => {
  res.send("add a new post");
};
module.exports = { getAllPosts, AddNewPost };
