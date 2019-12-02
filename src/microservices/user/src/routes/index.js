import express from "express";
import config from "../utils/config";
import user from "./user.route";

const apiPrefix = config.api.prefix;
const router = express.Router();

router.use(`${apiPrefix}/user`, user);

export default router;
