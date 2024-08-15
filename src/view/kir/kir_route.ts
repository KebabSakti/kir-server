import express from "express";
import * as kir from "./kir_controller";

const router = express.Router();

router.get("/", kir.list);

export default router;
