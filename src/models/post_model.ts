import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    delete: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

export = mongoose.model("Post", postSchema);
