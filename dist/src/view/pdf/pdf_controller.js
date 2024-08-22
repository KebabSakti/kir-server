"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.create = create;
exports.read = read;
exports.update = update;
exports.remove = remove;
const error_1 = require("../../common/error");
const loader_1 = require("../../feature/loader");
const uploader_1 = require("../../helper/uploader");
async function list(req, res) {
    try {
        const data = await loader_1.pdfApi.list();
        return res.json(data);
    }
    catch (error) {
        return (0, error_1.Failure)(error, res);
    }
}
async function create(req, res) {
    try {
        const uploadedFiles = await (0, uploader_1.uploadImage)(req.files, "png");
        uploadedFiles.forEach((file) => {
            req.body[file.fieldName] = file.fileName;
        });
        loader_1.pdfApi.create(req.body);
        return res.end();
    }
    catch (error) {
        return (0, error_1.Failure)(error, res);
    }
}
async function read(req, res) {
    try {
        const data = await loader_1.pdfApi.read(req.params.id);
        return res.json(data);
    }
    catch (error) {
        return (0, error_1.Failure)(error, res);
    }
}
async function update(req, res) {
    try {
        if (req.files != undefined) {
            const uploadedFiles = await (0, uploader_1.uploadImage)(req.files, "png");
            uploadedFiles.forEach((file) => {
                req.body[file.fieldName] = file.fileName;
            });
        }
        await loader_1.pdfApi.update(req.body);
        return res.end();
    }
    catch (error) {
        return (0, error_1.Failure)(error, res);
    }
}
async function remove(req, res) {
    try {
        await loader_1.pdfApi.remove(req.body.id);
        return res.end();
    }
    catch (error) {
        return (0, error_1.Failure)(error, res);
    }
}
