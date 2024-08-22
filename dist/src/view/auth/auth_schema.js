"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLoginSchema = void 0;
const yup_1 = require("yup");
exports.authLoginSchema = (0, yup_1.object)({
    email: (0, yup_1.string)()
        .email("Email tidak valid")
        .required("Email tidak boleh kosong"),
    password: (0, yup_1.string)().required("Password tidak boleh kosong"),
});
