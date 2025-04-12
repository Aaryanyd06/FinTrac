import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
  try {
    const dbURI = process.env.DBURI;
    if (!dbURI) {
      throw new Error("Environment variable 'DBURI' is not defined");
    }

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    // Don't exit process in production as it will crash the serverless function
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

export default connectDatabase;
