"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = uploadImage;
const crypto_1 = require("crypto");
const sharp_1 = __importDefault(require("sharp"));
const config_1 = require("../common/config");
async function uploadImage(files, format = "jpg") {
    const uploadedFiles = [];
    for (const file of files) {
        const { buffer, originalname, fieldname } = file;
        const fileName = `${(0, crypto_1.randomUUID)()}-${originalname}`;
        const image = (0, sharp_1.default)(buffer);
        if (format == "jpg") {
            image.jpeg({ quality: 50 });
        }
        if (format == "png") {
            image.png({ quality: 50 });
        }
        await image.resize(800).toFile(`./${config_1.staticDir}/${fileName}`);
        uploadedFiles.push({
            fieldName: fieldname,
            fileName: fileName,
        });
    }
    return uploadedFiles;
}
