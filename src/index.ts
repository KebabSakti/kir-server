require("dotenv").config();

import cors from "cors";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import express from "express";
import http from "http";
import multer from "multer";
import path from "path";
import authRoute from "./view/auth/auth_route";
import certificateRoute from "./view/certificate/certificate_route";
import kirRoute from "./view/kir/kir_route";
import { isAdmin } from "./view/middleware";
import pdfRoute from "./view/pdf/pdf_route";

dayjs.extend(utc);
dayjs.extend(timezone);

const app = express();
const server = http.createServer(app);
const port = 3000;

const storage = multer.memoryStorage();
const multerInstance = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), `${process.env.DIR!}/upload`)));
app.use(multerInstance.any());

// PUBLIC API
app.use("/", authRoute);
app.use("/certificate", certificateRoute);

// PRIVATE API
app.use("/admin", isAdmin);
app.use("/admin/kir", kirRoute);
app.use("/admin/pdf", pdfRoute);

//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));

server.listen(port);
