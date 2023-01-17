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
const message_model_1 = __importDefault(require("../models/message_model"));
const Response_1 = __importDefault(require("../common/Response"));
const Error_1 = __importDefault(require("../common/Error"));
const getAllMessage = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let messages = {};
        if (req.senderId == null) {
            messages = yield message_model_1.default.find();
        }
        else {
            messages = yield message_model_1.default.find({ sender: req.senderId });
        }
        return new Response_1.default(messages, req.userId, null);
    }
    catch (err) {
        return new Response_1.default(null, req.userId, new Error_1.default(400, err.message));
    }
});
const getMessageById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield message_model_1.default.findById(req.postId);
        return new Response_1.default(messages, req.userId, null);
    }
    catch (err) {
        return new Response_1.default(null, req.userId, new Error_1.default(400, err.message));
    }
});
const addNewMessage = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const message = new message_model_1.default({
        message: req.body.message,
        sender: req.userId,
    });
    try {
        const newMessage = yield message.save();
        return new Response_1.default(newMessage, req.userId, null);
    }
    catch (err) {
        return new Response_1.default(null, req.userId, new Error_1.default(400, err.message));
    }
});
module.exports = { addNewMessage, getAllMessage, getMessageById };
//# sourceMappingURL=message.js.map