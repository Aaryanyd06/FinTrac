import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
  try {
    const { dbURI } = process.env;
    if (!dbURI) {
      throw new Error("Environment variable 'dbURI' is not defined");
    }
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDatabase;
