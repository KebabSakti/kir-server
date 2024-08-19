require("dotenv").config();

import cors from "cors";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import express from "express";
import http from "http";
import nodemailer from "nodemailer";
import { staticDir } from "./common/config";
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticDir));

// PUBLIC API
app.use("/", authRoute);
app.use("/certificate", certificateRoute);

// PRIVATE API
app.use("/admin", isAdmin);
app.use("/admin/kir", kirRoute);
app.use("/admin/pdf", pdfRoute);

app.get("/mail", async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailersend.net",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "MS_plBvcE@trial-jy7zpl9vj5pg5vx6.mlsender.net",
      pass: "A5OK7Bl73kzlYo79",
    },
  });

  await transporter.sendMail({
    from: "julian.aryo1989@gmail.com", // sender address
    to: "julian.aryo1989@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  res.end();
});

//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));

server.listen(port);
