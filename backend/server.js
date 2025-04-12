import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import auth from "./routes/auth.js";
import expense from "./routes/expense.js";
import cors from "cors";

dotenv.config();

const app = express();

// Connect to database
connectDatabase();

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://expense-tracker-eight-liard.vercel.app",
      "https://expense-tracker-hnei.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

// Add CORS headers to all responses as a fallback
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use("/api", auth);
app.use("/api/expense", expense);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome");
});

// Start the server only if not in a serverless environment
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

// Export app for serverless deployment
export default app;
