// Main entry point for Vercel serverless deployment
import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import auth from "./routes/auth.js";
import expense from "./routes/expense.js";
import cors from "cors";
import serverless from "serverless-http"; // <-- this is crucial for Vercel

dotenv.config();

// Create Express app
const app = express();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Connect to database
connectDatabase();

// Middleware
app.use(
  cors({
    origin: "*", // Allow all origins for now — restrict later in production
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api", auth);
app.use("/api/expense", expense);

// Test route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Expense Tracker API");
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("API is healthy");
});

// Start local dev server only if NOT in production/serverless
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(
      `Server running on port ${PORT} in ${
        process.env.NODE_ENV || "development"
      } mode`
    )
  );
}

// Export Express app and serverless handler for Vercel
const handler = serverless(app);
export const config = {
  api: {
    bodyParser: false, // Vercel optimization for raw body
  },
};
export { handler };
export default app;
