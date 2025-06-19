import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";

const app = express();

// Connection to the database
connectDB();
app.use(express.json());

// Authentication routes
app.use("/api/auth/user", authRouter);

// Basic route for testing
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the API!" });
});

export default app;
