"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfDefault = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const prisma_1 = require("../../common/prisma");
class PdfDefault {
    async list() {
        const result = await prisma_1.prisma.pdf.findMany({
            where: { deleted: null },
            orderBy: {
                created: "desc",
            },
        });
        const data = result;
        return data;
    }
    async create(param) {
        await prisma_1.prisma.pdf.create({
            data: param,
        });
    }
    async read(id) {
        const result = await prisma_1.prisma.pdf.findUnique({
            where: { id: id },
        });
        const data = result;
        return data;
    }
    async update(param) {
        await prisma_1.prisma.pdf.update({
            where: { id: param.id },
            data: { ...param, updated: (0, dayjs_1.default)().toDate(), deleted: null },
        });
    }
    async remove(id) {
        await prisma_1.prisma.pdf.update({
            where: { id: id },
            data: {
                deleted: (0, dayjs_1.default)().toDate(),
            },
        });
    }
}
exports.PdfDefault = PdfDefault;
