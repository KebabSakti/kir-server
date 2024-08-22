"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfCreateSchema = void 0;
const yup_1 = require("yup");
exports.pdfCreateSchema = (0, yup_1.object)({
    name: (0, yup_1.string)().required("Nama tidak boleh kosong"),
    level: (0, yup_1.string)().required("Level tidak boleh kosong"),
    number: (0, yup_1.string)().required("Nomor tidak boleh kosong"),
});
