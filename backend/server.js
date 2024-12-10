import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import auth from './routes/auth.js'
import cors from 'cors'

dotenv.config();

const app = express();

// Connect to database
connectDatabase();

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); 
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use(express.json());
app.use('/api',auth);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  )
);
