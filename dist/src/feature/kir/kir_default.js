"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KirDefault = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const prisma_1 = require("../../common/prisma");
const utility_1 = require("../../common/utility");
class KirDefault {
    async create(param) {
        const certificate = (0, utility_1.randomNumber)();
        const expiryDate = (0, dayjs_1.default)().add(6, "month").toDate();
        await prisma_1.prisma.kir.create({
            data: {
                ...param,
                certificateNumber: certificate.toString(),
                expiryDate: expiryDate,
            },
        });
    }
    async read(id) {
        const data = await prisma_1.prisma.kir.findUnique({
            where: { id: id },
        });
        return data;
    }
    async update(param) {
        await prisma_1.prisma.kir.update({
            where: {
                id: param.id,
            },
            data: { ...param, updated: (0, dayjs_1.default)().toDate(), deleted: null },
        });
    }
    async remove(id) {
        await prisma_1.prisma.kir.update({
            where: { id: id },
            data: { deleted: (0, dayjs_1.default)().toDate() },
        });
    }
    async list(param) {
        let filter = {
            where: {
                deleted: null,
            },
        };
        if (param?.pagination != undefined) {
            const paginate = {
                skip: Number(param.pagination.skip),
                take: Number(param.pagination.take),
            };
            filter = { ...filter, ...paginate };
        }
        if (param?.certificateNumber != undefined) {
            filter["where"] = {
                ...filter.where,
                certificateNumber: {
                    contains: param?.certificateNumber,
                },
            };
        }
        const data = await prisma_1.prisma.kir.findMany({
            ...filter,
            orderBy: {
                created: "desc",
            },
        });
        return data;
    }
    async find(certificateNumber) {
        const data = await prisma_1.prisma.kir.findFirst({
            where: { certificateNumber: certificateNumber },
        });
        return data;
    }
}
exports.KirDefault = KirDefault;
