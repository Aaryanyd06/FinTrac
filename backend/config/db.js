import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
  try {
    console.log("Checking database URI...");
    const dbURI = process.env.DBURI;
    if (!dbURI) {
      console.error("DBURI environment variable is missing");
      throw new Error("Environment variable 'DBURI' is not defined");
    }

    console.log("Attempting to connect to MongoDB...");
    const startTime = Date.now();

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    const endTime = Date.now();
    console.log(`Database connected successfully in ${endTime - startTime}ms`);

    // Log MongoDB connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    console.error("Full error:", error);
    // Don't exit process in production as it will crash the serverless function
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
    throw error; // Re-throw the error to be caught by the caller
  }
};

export default connectDatabase;
