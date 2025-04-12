import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import auth from "./routes/auth.js";
import expense from "./routes/expense.js";
import cors from "cors";
import serverless from "serverless-http";

dotenv.config();

const app = express();

// Connect to database
connectDatabase();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://expense-tracker-eight-liard.vercel.app",
  "https://expense-tracker-hnei.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use("/api", auth);
app.use("/api/expense", expense);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome");
});

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
const handler = serverless(app);
export { handler };
export default app;
