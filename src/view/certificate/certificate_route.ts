import express from "express";
import * as certificate from "./certificate_controller";

const router = express.Router();

router.get("/:certificate", certificate.print);

export default router;
