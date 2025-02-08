import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
  },
  googleId: {
    type: String,
  },
  budget: { type: Number, default: 1000 },
});

let model = mongoose.model("User", userSchema);

export default model;