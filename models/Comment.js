import mongoose from "mongoose";
import { stringLiteral } from "babel-types";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Comment", commentSchema);
export default model;
