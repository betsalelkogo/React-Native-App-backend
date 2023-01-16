import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
  avatarUrl: {
    type: String,
    required: true,
  },
});

export = mongoose.model("Student", studentSchema);
