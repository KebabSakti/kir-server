"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const multer_1 = __importDefault(require("multer"));
const config_1 = require("./common/config");
const auth_route_1 = __importDefault(require("./view/auth/auth_route"));
const certificate_route_1 = __importDefault(require("./view/certificate/certificate_route"));
const kir_route_1 = __importDefault(require("./view/kir/kir_route"));
const middleware_1 = require("./view/middleware");
const pdf_route_1 = __importDefault(require("./view/pdf/pdf_route"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = 3000;
const storage = multer_1.default.memoryStorage();
const multerInstance = (0, multer_1.default)({ storage });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(config_1.staticDir));
app.use(multerInstance.any());
// PUBLIC API
app.use("/", auth_route_1.default);
app.use("/certificate", certificate_route_1.default);
// PRIVATE API
app.use("/admin", middleware_1.isAdmin);
app.use("/admin/kir", kir_route_1.default);
app.use("/admin/pdf", pdf_route_1.default);
//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));
server.listen(port);
