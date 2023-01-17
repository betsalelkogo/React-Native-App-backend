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
const Response_1 = __importDefault(require("../common/Response"));
const Error_1 = __importDefault(require("../common/Error"));
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAllPosts");
    try {
        let posts = {};
        posts = yield post_model_1.default.find();
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(400).send({ error: "fail to get posts from db" });
    }
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    try {
        const posts = yield post_model_1.default.findById(req.params.id);
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(400).send({ error: "fail to get posts from db" });
    }
});
const addNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const post = new post_model_1.default({
        _id: req.body._id,
        title: req.body.title,
        detail: req.body.detail,
        avatarUrl: req.body.avatarUrl,
    });
    try {
        const newPost = yield post.save();
        console.log("save post in db");
        res.status(200).send(newPost);
    }
    catch (err) {
        console.log("fail to save post in db " + err);
        res.status(400).send({ error: "fail adding new post to db" });
    }
});
const updatePost = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { _id: req.postId };
        const update = { message: req.body.message };
        const message = yield post_model_1.default.findOneAndUpdate(filter, update, {
            new: true,
        });
        return new Response_1.default(message, req.userId, null);
    }
    catch (err) {
        return new Response_1.default(null, req.userId, new Error_1.default(400, err.message));
    }
});
module.exports = { getAllPosts, addNewPost, getPostById, updatePost };
//# sourceMappingURL=post.js.map