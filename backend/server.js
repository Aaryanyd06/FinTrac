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
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
