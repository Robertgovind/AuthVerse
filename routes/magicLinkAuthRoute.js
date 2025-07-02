import express from "express";
import {
  requestMagicLink,
  verifyMagicLink,
} from "../controllers/magicLinkAuthController.js";

const magicLinkAuthRouter = express.Router();

magicLinkAuthRouter.post("/magic-link/request", requestMagicLink);
magicLinkAuthRouter.get("/magic-link", verifyMagicLink);

export default magicLinkAuthRouter;
