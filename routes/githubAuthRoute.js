import express from "express";
import passport from "passport";
import githubAuthCallback from "../controllers/githubAuthController.js";

const githubAuthRouter = express.Router();

githubAuthRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

githubAuthRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  githubAuthCallback
);

export default githubAuthRouter;
