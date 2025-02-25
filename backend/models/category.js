// models/category.js (if you have a separate file for the Category model)
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Category", categorySchema);
