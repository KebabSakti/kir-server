"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDefault = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailersend_1 = require("mailersend");
const error_1 = require("../../common/error");
const prisma_1 = require("../../common/prisma");
class AuthDefault {
    async update(param) {
        const admin = await prisma_1.prisma.admin.findUnique({
            where: {
                email: param.email,
            },
        });
        if (admin == null) {
            throw new error_1.NotFound("User tidak ditemukan");
        }
        const passwordIsValid = await bcryptjs_1.default.compare(param.oldPassword, admin.password);
        if (!passwordIsValid) {
            throw new error_1.BadRequest("Password lama anda salah");
        }
        const hashedPass = bcryptjs_1.default.hashSync(param.newPassword, 10);
        await prisma_1.prisma.admin.update({
            where: {
                email: param.email,
            },
            data: {
                password: hashedPass,
                updated: (0, dayjs_1.default)().toDate(),
            },
        });
    }
    async login(param) {
        const admin = await prisma_1.prisma.admin.findUnique({
            where: {
                email: param.email,
            },
        });
        if (admin != null) {
            const passwordIsValid = await bcryptjs_1.default.compare(param.password, admin.password);
            if (passwordIsValid) {
                const token = jsonwebtoken_1.default.sign(admin.email, process.env.JWT_KEY);
                return token;
            }
        }
    }
    async check(token) {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        if (payload) {
            const admin = await prisma_1.prisma.admin.findUnique({
                select: {
                    id: true,
                    email: true,
                },
                where: {
                    email: payload.toString(),
                },
            });
            return admin ?? undefined;
        }
    }
    async emailResetLink(email) {
        const mailerSend = new mailersend_1.MailerSend({
            apiKey: process.env.MAILER_API,
        });
        const sentFrom = new mailersend_1.Sender("you@yourdomain.com", "Your name");
        const recipients = [new mailersend_1.Recipient(email)];
        const emailParams = new mailersend_1.EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject("This is a Subject")
            .setHtml("<strong>This is the HTML content</strong>")
            .setText("This is the text content");
        await mailerSend.email.send(emailParams);
    }
}
exports.AuthDefault = AuthDefault;
