"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfApi = exports.kirApi = exports.authApi = void 0;
const auth_default_1 = require("./auth/auth_default");
const kir_default_1 = require("./kir/kir_default");
const pdf_default_1 = require("./pdf/pdf_default");
exports.authApi = new auth_default_1.AuthDefault();
exports.kirApi = new kir_default_1.KirDefault();
exports.pdfApi = new pdf_default_1.PdfDefault();
