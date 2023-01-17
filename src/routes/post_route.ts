/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The Post API
 */

import express from "express";
import post from "../controllers/post";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - details
 *         - avatarUrl
 *       properties:
 *         id:
 *           type: string
 *           description: The post id
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
 *         id: '123'
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
router.get("/", post.getAllPosts);

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
router.get("/:id", post.getPostById);

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
router.post("/", post.addNewPost);

export = router;
