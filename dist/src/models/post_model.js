"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        required: true,
    },
});
module.exports = mongoose_1.default.model("Post", postSchema);
//# sourceMappingURL=post_model.js.map