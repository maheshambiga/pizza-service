import { Router } from "express";
import { getProfileController } from "./user.controller";
import {
  verifyToken,
  checkTokenPresence,
  attachCurrentUser
} from "../services/auth";

const router = Router();

router.get(
  "/profile",
  checkTokenPresence,
  verifyToken,
  attachCurrentUser,
  getProfileController
);

export default router;
