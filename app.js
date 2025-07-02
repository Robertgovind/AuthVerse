import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";

import googleAuthRouter from "./routes/googleAuthRoute.js";
// import passport from "./utils/passport/googleStrategy.js";
import sessionMiddleware from "./middlewares/session.js";

// import passport from "./utils/passport/githubStrategy.js";
import githubAuthRouter from "./routes/githubAuthRoute.js";

import passport from "./utils/passport/facebookStrategy.js";
import facebookAuthRouter from "./routes/facebookAuthRoute.js";
import magicLinkAuthRouter from "./routes/magicLinkAuthRoute.js";

const app = express();

// Connection to the database
connectDB();
app.use(express.json());

// Authentication routes
app.use("/api/auth/user", authRouter);

// Authenticatoin using google
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// google login route
app.use("/api/auth", googleAuthRouter);

// github login route
app.use("/api/auth", githubAuthRouter);

// facebook login
app.use("/api/auth", facebookAuthRouter);

// magic link routes
app.use("/api/auth", magicLinkAuthRouter);

app.get("/login", (req, res) => {
  res.send("<h1>You are logged in and this is your profile</h1>");
});

// Basic route for testing
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the API!" });
});

export default app;
