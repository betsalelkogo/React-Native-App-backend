import request from "supertest";
import app from "../server";
import mongoose from "mongoose";
import Message from "../models/message_model";
import User from "../models/user_model";

const newMessage = "This is the new test post message";
let newMessageSender = "";
let newMessageId = "";
const newMessageUpdated = "This is the updated message";

const userEmail = "user1@gmail.com";
const userPassword = "12345";
let accessToken = "";

beforeAll(async () => {
  await Message.deleteMany();
  await User.deleteMany();
  const res = await request(app).post("/auth/register").send({
    email: userEmail,
    password: userPassword,
  });
  newMessageSender = res.body._id;
});

async function loginUser() {
  const response = await request(app).post("/auth/login").send({
    email: userEmail,
    password: userPassword,
  });
  accessToken = response.body.accessToken;
}

beforeEach(async () => {
  await loginUser();
});

afterAll(async () => {
  await Message.deleteMany();
  await User.deleteMany();
  mongoose.connection.close();
});

describe("Message Tests", () => {
  test("add new Message", async () => {
    const response = await request(app)
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
  });

  test("get all Message", async () => {
    const response = await request(app)
      .get("/message")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toEqual(200);
    expect(response.body.post[0].message).toEqual(newMessage);
    expect(response.body.post[0].sender).toEqual(newMessageSender);
  });

  test("get Message by id", async () => {
    const response = await request(app)
      .get("/post/" + newMessageId)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toEqual(200);
    expect(response.body.post.message).toEqual(newMessage);
    expect(response.body.post.sender).toEqual(newMessageSender);
  });

  test("get Message by wrong id fails", async () => {
    const response = await request(app)
      .get("/message/12345")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toEqual(400);
  });

  test("get Message by sender", async () => {
    const response = await request(app)
      .get("/message?sender=" + newMessageSender)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toEqual(200);
    expect(response.body.post[0].message).toEqual(newMessage);
    expect(response.body.post[0].sender).toEqual(newMessageSender);
  });

  test("update Message by ID", async () => {
    let response = await request(app)
      .put("/message/" + newMessageId)
      .set("Authorization", "JWT " + accessToken)
      .send({
        message: newMessageUpdated,
        sender: newMessageSender,
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body.post.message).toEqual(newMessageUpdated);
    expect(response.body.post.sender).toEqual(newMessageSender);

    response = await request(app)
      .get("/message/" + newMessageId)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toEqual(200);
    expect(response.body.post.message).toEqual(newMessageUpdated);
    expect(response.body.post.sender).toEqual(newMessageSender);

    response = await request(app)
      .put("/message/12345")
      .set("Authorization", "JWT " + accessToken)
      .send({
        message: newMessageUpdated,
        sender: newMessageSender,
      });
    expect(response.statusCode).toEqual(400);

    response = await request(app)
      .put("/message/" + newMessageId)
      .set("Authorization", "JWT " + accessToken)
      .send({
        message: newMessageUpdated,
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body.post.message).toEqual(newMessageUpdated);
    expect(response.body.post.sender).toEqual(newMessageSender);
  });
});
