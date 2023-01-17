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
const message_1 = __importDefault(require("../controllers/message"));
const message_2 = __importDefault(require("../controllers/message"));
const Request_1 = __importDefault(require("../common/Request"));
module.exports = (io, socket) => {
    const getAllMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield message_1.default.getAllMessage(new Request_1.default(payload, socket.data.user, null, null));
            socket.emit("post:get.response", res.body);
        }
        catch (err) {
            socket.emit("post:get.response", { status: "fail" });
        }
    });
    const getMessageById = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield message_1.default.getMessageById(new Request_1.default(payload, socket.data.user, null, payload.id));
            socket.emit("post:get:id.response", res.body);
        }
        catch (err) {
            socket.emit("post:get:id.response", { status: "fail" });
        }
    });
    const getMessageBySender = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield message_1.default.getAllMessage(new Request_1.default(payload, socket.data.user, payload.sender, null));
            socket.emit("post:get:sender.response", res.body);
        }
        catch (err) {
            socket.emit("post:get:sender.response", { status: "fail" });
        }
    });
    const addNewMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield message_2.default.addNewMessage(new Request_1.default(payload, socket.data.user, null, null));
            socket.emit("post:add.response", res.body);
        }
        catch (err) {
            socket.emit("post:add.response", { status: "fail" });
        }
    });
    socket.on("post:get", getAllMessage);
    socket.on("post:get:id", getMessageById);
    socket.on("post:add", addNewMessage);
    socket.on("post:get:sender", getMessageBySender);
};
//# sourceMappingURL=postHandler.js.map