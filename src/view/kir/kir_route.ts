import express from "express";
import * as kir from "./kir_controller";

const router = express.Router();

router.get("/", kir.list);
router.get("/:id/read", kir.read);
router.post("/", kir.create);
router.patch("/", kir.update);
router.delete("/", kir.remove);
router.get("/:id/certificate", kir.certificate);

export default router;
