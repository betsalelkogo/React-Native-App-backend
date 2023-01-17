import request from "supertest";
import app from "../server";
import mongoose from "mongoose";
import Post from "../models/post_model";

let newPostId = "";

beforeAll(async () => {
  await Post.remove();
  console.log("beforeAll");
});

afterAll(async () => {
  console.log("afterAll");
  mongoose.connection.close();
});

describe("Post Tests", () => {
  test("add new Post", async () => {
    const response = await request(app).post("/post").send({
      _id: 1234,
      name: "Oren",
      avatarUrl: "www.localhost:3000/oren.jpg",
    });
    expect(response.statusCode).toEqual(200);
    newPostId = response.body._id;
  });

  test("get all Posts", async () => {
    const response = await request(app).get("/post");
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  test("get Post by id", async () => {
    const response = await request(app).get("/post/" + newPostId);
    expect(response.statusCode).toEqual(200);
  });
});
