const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const commentMaxLen = 200;

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    maxLength: [commentMaxLen, `Comment cannot exceed ${commentMaxLen} characters`],
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const blogSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  author: { type: String, required: true },
  comments: [commentSchema],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

commentSchema.set("toJSON", {
  transform: (_doc, returnObj) => {
    returnObj.id = returnObj._id;
    delete returnObj._id;
    delete returnObj.__v;
  },
});

blogSchema.set("toJSON", {
  transform: (_doc, returnObj) => {
    returnObj.id = returnObj._id;
    delete returnObj._id;
    delete returnObj.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
