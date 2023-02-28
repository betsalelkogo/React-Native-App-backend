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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveMessage = exports.getAllMessages = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const message_model_1 = __importDefault(require("../models/message_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
const getAllMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield message_model_1.default.aggregate([
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
                    _id: 0,
                    email: 0,
                },
            },
        ]);
        return { status: "OK", data: messages };
    }
    catch (err) {
        return { status: "FAIL", data: "" };
    }
});
exports.getAllMessages = getAllMessages;
const saveMessage = (message, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const msg = new message_model_1.default({
            message,
            userId: new mongoose_1.default.Types.ObjectId(userId),
        });
        yield msg.save();
        const dbMsg = yield message_model_1.default.aggregate([
            { $match: { _id: msg._id } },
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
                    _id: 0,
                    email: 0,
                },
            },
        ]);
        return { status: "OK", data: dbMsg[0] };
    }
    catch (err) {
        return { status: "FAIL", data: err };
    }
});
exports.saveMessage = saveMessage;
//# sourceMappingURL=message.js.map