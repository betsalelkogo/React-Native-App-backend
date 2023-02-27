"use strict";
/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The Post API
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const post_1 = __importDefault(require("../controllers/post"));
const auth_1 = __importDefault(require("../controllers/auth"));
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - userEmail
 *         - title
 *         - details
 *         - avatarUrl
 *       properties:
 *         userEmail:
 *           type: string
 *           description: The user Email that upload the post
 *         title:
 *           type: string
 *           description: The post title
 *         details:
 *           type: string
 *           description: The post details
 *         avatarUrl:
 *           type: string
 *           description: The post avatar url
 *       example:
 *         userEmail: 'Oren@gmail.com'
 *         title: 'Oren'
 *         details: 'Oren Test'
 *         avatarUrl: 'www.mysute/oren.jpg'
 */
/**
 * @swagger
 * /post:
 *   get:
 *     summary: get list of post from server
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: the list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Post'
 *
 */
router.get("/", auth_1.default.authenticateMiddleware, post_1.default.getAllPosts);
/**
 * @swagger
 * /post:
 *   get:
 *     summary: get list of post from server
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: the list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Post'
 *
 */
router.get("/my-posts", auth_1.default.authenticateMiddleware, post_1.default.getAllMyPosts);
/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: get post by id
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         requiered: true
 *         schema:
 *           type: string
 *           description: the requested post id
 *     responses:
 *       200:
 *         description: the requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *
 */
router.get("/:id", auth_1.default.authenticateMiddleware, post_1.default.getPostById);
/**
 * @swagger
 * /post:
 *   post:
 *     summary: add a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: the requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *
 */
router.post("/", auth_1.default.authenticateMiddleware, post_1.default.addNewPost);
/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: update existing post by id
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         requiered: true
 *         schema:
 *           type: string
 *           description: the updated post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: the requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *
 */
router.put("/:id", auth_1.default.authenticateMiddleware, post_1.default.updatePostById);
module.exports = router;
//# sourceMappingURL=post_route.js.map