import express from "express";
import * as auth from "./auth_controller";

const router = express.Router();

router.post("/auth", auth.login);
router.put("/auth", auth.update);
router.post("/auth/email", auth.emailResetLink);

export default router;
