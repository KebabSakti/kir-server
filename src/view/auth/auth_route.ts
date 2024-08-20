import express from "express";
import * as auth from "./auth_controller";
import { isAdmin } from "../middleware";

const router = express.Router();

router.post("/auth", auth.login);
router.post("/auth/email", auth.emailResetLink);
router.put("/auth", isAdmin, auth.update);

export default router;
