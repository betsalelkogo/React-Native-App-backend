import Post from "../models/post_model";
import NewRequest from "../common/Request";
import NewResponse from "../common/Response";
import { Request, Response } from "express";
import NewError from "../common/Error";

const getAllPosts = async (req: Request, res: Response) => {
  console.log("getAllPosts");

  try {
    let posts = {};
    posts = await Post.find();
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send({ error: "fail to get posts from db" });
  }
};

const getPostById = async (req: Request, res: Response) => {
  console.log("getPostById");
  console.log(req.params.id);
  try {
    const posts = await Post.findById(req.params.id);
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send({ error: "fail to get posts from db" });
  }
};

const addNewPost = async (req: Request, res: Response) => {
  console.log(req.body);

  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    detail: req.body.detail,
    avatarUrl: req.body.avatarUrl,
  });

  try {
    const newPost = await post.save();
    console.log("save post in db");
    res.status(200).send(newPost);
  } catch (err) {
    console.log("fail to save post in db " + err);
    res.status(400).send({ error: "fail adding new post to db" });
  }
};

const updatePost = async (req: NewRequest) => {
  try {
    const filter = { _id: req.postId };
    const update = { message: req.body.message };

    const message = await Post.findOneAndUpdate(filter, update, {
      new: true,
    });
    return new NewResponse(message, req.userId, null);
  } catch (err) {
    return new NewResponse(null, req.userId, new NewError(400, err.message));
  }
};

export = { getAllPosts, addNewPost, getPostById, updatePost };
