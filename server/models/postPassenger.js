import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  ticket: String,
  preferences: {
    seatType: String,
    seatClass: String,
    neighbors: [String],
  },
  flags: [String],
});

const PostPassenger = mongoose.model("PostPassenger", postSchema);

export default PostPassenger;