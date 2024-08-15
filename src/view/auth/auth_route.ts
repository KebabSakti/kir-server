import express from "express";
import * as auth from "./auth_controller";

const router = express.Router();

router.post("/auth", auth.login);

export default router;
