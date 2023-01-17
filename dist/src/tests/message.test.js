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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const message_model_1 = __importDefault(require("../models/message_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
const newMessage = "This is the new test post message";
let newMessageSender = "";
let newMessageId = "";
const newMessageUpdated = "This is the updated message";
const userEmail = "user1@gmail.com";
const userPassword = "12345";
let accessToken = "";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield message_model_1.default.deleteMany();
    yield user_model_1.default.deleteMany();
    const res = yield (0, supertest_1.default)(server_1.default).post("/auth/register").send({
        email: userEmail,
        password: userPassword,
    });
    newMessageSender = res.body._id;
}));
function loginUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post("/auth/login").send({
            email: userEmail,
            password: userPassword,
        });
        accessToken = response.body.accessToken;
    });
}
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield loginUser();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield message_model_1.default.deleteMany();
    yield user_model_1.default.deleteMany();
    mongoose_1.default.connection.close();
}));
describe("Message Tests", () => {
    test("add new Message", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post("/message")
            .set("Authorization", "JWT " + accessToken)
            .send({
            message: newMessage,
            sender: newMessageSender,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.post.message).toEqual(newMessage);
        expect(response.body.post.sender).toEqual(newMessageSender);
        newMessageId = response.body.post._id;
    }));
    test("get all Message", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .get("/message")
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.post[0].message).toEqual(newMessage);
        expect(response.body.post[0].sender).toEqual(newMessageSender);
    }));
    test("get Message by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .get("/post/" + newMessageId)
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.post.message).toEqual(newMessage);
        expect(response.body.post.sender).toEqual(newMessageSender);
    }));
    test("get Message by wrong id fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .get("/message/12345")
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toEqual(400);
    }));
    test("get Message by sender", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .get("/message?sender=" + newMessageSender)
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.post[0].message).toEqual(newMessage);
        expect(response.body.post[0].sender).toEqual(newMessageSender);
    }));
    test("update Message by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(server_1.default)
            .put("/message/" + newMessageId)
            .set("Authorization", "JWT " + accessToken)
            .send({
            message: newMessageUpdated,
            sender: newMessageSender,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.post.message).toEqual(newMessageUpdated);
        expect(response.body.post.sender).toEqual(newMessageSender);
        response = yield (0, supertest_1.default)(server_1.default)
            .get("/message/" + newMessageId)
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.post.message).toEqual(newMessageUpdated);
        expect(response.body.post.sender).toEqual(newMessageSender);
        response = yield (0, supertest_1.default)(server_1.default)
            .put("/message/12345")
            .set("Authorization", "JWT " + accessToken)
            .send({
            message: newMessageUpdated,
            sender: newMessageSender,
        });
        expect(response.statusCode).toEqual(400);
        response = yield (0, supertest_1.default)(server_1.default)
            .put("/message/" + newMessageId)
            .set("Authorization", "JWT " + accessToken)
            .send({
            message: newMessageUpdated,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.post.message).toEqual(newMessageUpdated);
        expect(response.body.post.sender).toEqual(newMessageSender);
    }));
});
//# sourceMappingURL=message.test.js.map