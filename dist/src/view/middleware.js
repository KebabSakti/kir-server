"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = isAdmin;
exports.middleware = middleware;
const error_1 = require("../common/error");
const loader_1 = require("../feature/loader");
async function isAdmin(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (authorization != undefined) {
            const payloads = authorization.split(" ");
            if (payloads.length == 2) {
                const token = payloads[1];
                const admin = await loader_1.authApi.check(token);
                if (admin != undefined) {
                    res.locals.auth = admin;
                    return next();
                }
            }
        }
        throw new error_1.Unauthorized("Akses tidak dizinkan");
    }
    catch (error) {
        return (0, error_1.Failure)(error, res);
    }
}
async function middleware(req, res, next) {
    try {
        const whitelist = ["/"];
        const path = req.originalUrl;
        const lastIndex = path.indexOf("/", 1);
        const currentPath = path.substring(1, lastIndex < 0 ? undefined : lastIndex);
        const whitelisted = whitelist.some((path) => path.includes(currentPath));
        if (whitelisted) {
            return next();
        }
        if (!whitelisted) {
            const authorization = req.headers.authorization;
            if (authorization != undefined) {
                const payloads = authorization.split(" ");
                if (payloads.length == 2) {
                    const token = payloads[1];
                    const admin = await loader_1.authApi.check(token);
                    if (admin != undefined) {
                        res.locals.auth = admin;
                        return next();
                    }
                }
            }
        }
        throw new error_1.Unauthorized("Akses tidak dizinkan");
    }
    catch (error) {
        return (0, error_1.Failure)(error, res);
    }
}
