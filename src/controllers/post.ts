import Post from "../models/post_model";
import NewRequest from "../common/Request";
import NewResponse from "../common/Response";
import { Request, Response } from "express";
import NewError from "../common/Error";
import User from "../models/user_model";

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
    const post = await Post.findById(req.params.id);
    console.log(post);
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send({ error: "fail to get posts from db" });
  }
};

const addNewPost = async (req: Request, res: Response) => {
  console.log("Add new post");
  try {
    const { userId, text, image } = req.body;
    console.log(req.body);
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      res
        .status(400)
        .send({ err: "Failed to create post - user id does not exists" });
    }

    const post = new Post({
      text,
      image,
      userId,
    });

    const userPosts = currentUser.posts || [];

    userPosts.push(post.id);
    currentUser.posts = userPosts;

    const [newPost] = await Promise.all([post.save(), currentUser.save()]);

    res.status(200).send(newPost);
  } catch (err) {
    res.status(400).send({ err: "fail adding new post to db" });
  }
};

const getAllMyPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).send({ err: "Token invalid. User id doesn't exists" });
    }

    const ids = user.posts;

    const posts = await Post.find({
      _id: { $in: ids },
    });

    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send({ err: "fail to get posts from db" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const { image, text, userId } = req.body;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);

    if (userId !== post.userId) {
      return res
        .status(401)
        .send({ err: "Error, user is not authorized to change this post." });
    }

    post.$set({
      image: image || post.avatarUrl,
      text: text || post.text,
    });

    await post.save();

    res.status(200).send(post);
  } catch (err) {
    console.log("fail to update post in db");
    res.status(400).send({ err: "fail adding new post to db" });
  }
};

export = { getAllPosts, addNewPost, getPostById, updatePost, getAllMyPosts };
