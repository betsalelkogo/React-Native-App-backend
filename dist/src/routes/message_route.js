"use strict";
/**
 * @swagger
 * tags:
 *   name: Message
 *   description: The Messages API
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const message_js_1 = __importDefault(require("../controllers/message.js"));
const auth_js_1 = __importDefault(require("../controllers/auth.js"));
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
router.get("/", message_js_1.default.getAllMessage);
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
router.get("/:id", auth_js_1.default.authenticateMiddleware, message_js_1.default.getMessageById);
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
router.post("/", auth_js_1.default.authenticateMiddleware, message_js_1.default.addNewMessage);
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
router.put("/:id", auth_js_1.default.authenticateMiddleware, message_js_1.default.getMessageById);
module.exports = router;
//# sourceMappingURL=message_route.js.map