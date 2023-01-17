/**
 * @swagger
 * tags:
 *   name: Message
 *   description: The Messages API
 */

import express from "express";
const router = express.Router();
import message from "../controllers/message.js";
import auth from "../controllers/auth.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - message
 *         - sender
 *       properties:
 *         message:
 *           type: string
 *           description: The message text
 *         sender:
 *           type: string
 *           description: The sending user id
 *       example:
 *         message: 'this is my new message'
 *         sender: '12342345234556'
 */

/**
 * @swagger
 * /message:
 *   get:
 *     summary: get list of messages from server
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sender
 *         schema:
 *           type: string
 *           description: filter the messages according to the given sender id
 *     responses:
 *       200:
 *         description: the list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Message'
 *
 */
router.get("/", message.getAllMessage);

/**
 * @swagger
 * /message/{id}:
 *   get:
 *     summary: get message by id
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         requiered: true
 *         schema:
 *           type: string
 *           description: the requested message id
 *     responses:
 *       200:
 *         description: the requested message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *
 */
router.get("/:id", auth.authenticateMiddleware, message.getMessageById);

/**
 * @swagger
 * /message:
 *   message:
 *     summary: add a new message
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: the requested message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *
 */
router.post("/", auth.authenticateMiddleware, message.addNewMessage);

/**
 * @swagger
 * /message/{id}:
 *   put:
 *     summary: update existing message by id
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         requiered: true
 *         schema:
 *           type: string
 *           description: the updated message id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: the requested message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *
 */
router.put("/:id", auth.authenticateMiddleware, message.getMessageById);

export = router;
