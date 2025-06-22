import express from "express";
import passport from "passport";
import facebookAuthCallback from "../controllers/facebookAuthController.js";

const facebookAuthRouter = express.Router();

facebookAuthRouter.get("/facebook", passport.authenticate("facebook"));
facebookAuthRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  facebookAuthCallback
);

export default facebookAuthRouter;
