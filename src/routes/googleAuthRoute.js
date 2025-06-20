import express from "express";
import passport from "passport";
import googleAuthCallback from "../controllers/googleAuthController.js";

const googleAuthRouter = express.Router();

googleAuthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleAuthRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: true }),
  googleAuthCallback
);

export default googleAuthRouter;
