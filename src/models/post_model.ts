import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
});

export = mongoose.model("Post", postSchema);
