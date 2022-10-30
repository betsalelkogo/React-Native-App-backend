const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT;
const db = mongoose.connection;
const postRouter = require("./routes/post_route.js");
const bodyParser = require("body-parser");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));

db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("connected to mongo DB");
});

app.use("/post", postRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
