"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const post_model_1 = __importDefault(require("../models/post_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
const getAllPostsEvent = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find();
        return { status: "OK", data: posts };
    }
    catch (err) {
        return { status: "FAIL", data: "" };
    }
});
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.aggregate([
            { $unwind: "$userId" },
            {
                $lookup: {
                    from: user_model_1.default.collection.name,
                    localField: "userId",
                    foreignField: "_id",
                    as: "owner",
                },
            },
            { $unwind: "$owner" },
            {
                $project: {
                    "owner.password": 0,
                    "owner.posts": 0,
                    "owner.createdAt": 0,
                    "owner.refresh_tokens": 0,
                    "owner.updatedAt": 0,
                    "owner.__v": 0,
                },
            },
        ]);
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(400).send({ err: "fail to get posts from db" });
    }
});
const getAllMyPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.status(400).send({ err: "Token invalid. User id doesn't exists" });
        }
        const ids = user.posts;
        const posts = yield post_model_1.default.find({
            _id: { $in: ids },
        });
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(400).send({ err: "fail to get posts from db" });
    }
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const posts = yield post_model_1.default.findById(id);
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(400).send({ err: "fail to get posts from db" });
    }
});
const addNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Add new post");
    try {
        const { userId, text, image } = req.body;
        console.log(req.body);
        const currentUser = yield user_model_1.default.findById(userId);
        if (!currentUser) {
            res
                .status(400)
                .send({ err: "Failed to create post - user id does not exists" });
        }
        const post = new post_model_1.default({
            text,
            image,
            userId: currentUser._id,
        });
        const userPosts = currentUser.posts || [];
        userPosts.push(post.id);
        currentUser.posts = userPosts;
        const [newPost] = yield Promise.all([post.save(), currentUser.save()]);
        res.status(200).send(newPost);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ err: "fail adding new post to db" + err });
    }
});
const deletePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("DeletePostById" + req.params);
        const { image, text, userId } = req.body;
        const myquery = { id: req.params };
        const currentUser = yield user_model_1.default.findById(userId);
        if (!currentUser) {
            res
                .status(400)
                .send({ err: "Failed to delete post - user id does not exists" });
        }
        const post = yield post_model_1.default.deleteOne(myquery);
        res.status(200).send(post);
    }
    catch (err) {
        res.status(400).send({ err: "fail adding new post to db" + err });
    }
});
const updatePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, text, userId } = req.body;
        const { id: postId } = req.params;
        const post = yield post_model_1.default.findById(postId);
        console.log(post.userId.toString());
        if (userId !== post.userId.toString()) {
            return res
                .status(401)
                .send({ err: "Error, user is not authorized to change this post." });
        }
        post.$set({
            image: image || post.image,
            text: text || post.text,
        });
        yield post.save();
        res.status(200).send(post);
    }
    catch (err) {
        console.log("fail to update post in db");
        res.status(400).send({ err: "fail adding new post to db" + err });
    }
});
module.exports = {
    getAllPosts,
    getAllMyPosts,
    addNewPost,
    getPostById,
    updatePostById,
    getAllPostsEvent,
    deletePostById,
};
//# sourceMappingURL=post.js.map