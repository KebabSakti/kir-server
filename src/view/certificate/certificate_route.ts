import express from "express";
import * as certificate from "./certificate_controller";

const router = express.Router();

router.get("/:certificate", certificate.print);
router.get("/:certificate/find", certificate.find);

export default router;
