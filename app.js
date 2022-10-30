const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;

const postRouter = require("./post.js");

app.use("/post", postRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
