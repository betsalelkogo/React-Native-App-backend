import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import postRouter from "./routes/post_route.js";
const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL); //,{useNewUrlParser:true})
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("connected to mongo DB");
});

app.use("/public", express.static("public"));

app.use("/post", postRouter);

export = app;
