import express from "express";
import config from "../utils/config";
import auth from "./auth.route";

const apiPrefix = config.api.prefix;

const router = express.Router();

router.use(`${apiPrefix}/auth`, auth);

export default router;
