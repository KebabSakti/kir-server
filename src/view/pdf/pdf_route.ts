import express from "express";
import * as pdf from "./pdf_controller";

const router = express.Router();

router.get("/", pdf.list);
router.get("/:id/read", pdf.read);
router.post("/", pdf.create);
router.patch("/", pdf.update);
router.delete("/", pdf.remove);

export default router;
