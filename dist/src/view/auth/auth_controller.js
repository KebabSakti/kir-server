"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.update = update;
exports.emailResetLink = emailResetLink;
const error_1 = require("../../common/error");
const loader_1 = require("../../feature/loader");
const auth_schema_1 = require("./auth_schema");
async function login(req, res) {
    try {
        await auth_schema_1.authLoginSchema.validate(req.body);
        const token = await loader_1.authApi.login(req.body);
        if (token != undefined) {
            return res.json({ token: token });
        }
        throw new error_1.Unauthorized();
    }
    catch (error) {
        return (0, error_1.Failure)(error, res);
    }
}
async function update(req, res) {
    try {
        const auth = res.locals.auth;
        const payload = {
            ...auth,
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword,
        };
        await loader_1.authApi.update(payload);
        return res.end();
    }
    catch (error) {
        return (0, error_1.Failure)(error, res);
    }
}
async function emailResetLink(req, res) {
    try {
        await loader_1.authApi.emailResetLink(req.body.email);
        return res.end();
    }
    catch (error) {
        return (0, error_1.Failure)(error, res);
    }
}
