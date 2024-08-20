import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import { BadRequest, NotFound } from "../../common/error";
import { prisma } from "../../common/prisma";
import { Admin } from "./admin";
import { AuthAccountUpdateParam, AuthApi, AuthLoginParam } from "./auth_api";

export class AuthDefault implements AuthApi {
  async update(param: AuthAccountUpdateParam): Promise<void> {
    const admin = await prisma.admin.findUnique({
      where: {
        email: param.email,
      },
    });

    if (admin == null) {
      throw new NotFound("User tidak ditemukan");
    }

    const passwordIsValid = await bcrypt.compare(
      param.oldPassword,
      admin.password
    );

    if (!passwordIsValid) {
      throw new BadRequest("Password lama anda salah");
    }

    const hashedPass = bcrypt.hashSync(param.newPassword, 10);

    await prisma.admin.update({
      where: {
        email: param.email,
      },
      data: {
        password: hashedPass,
        updated: dayjs().toDate(),
      },
    });
  }

  async login(param: AuthLoginParam): Promise<string | undefined> {
    const admin = await prisma.admin.findUnique({
      where: {
        email: param.email,
      },
    });

    if (admin != null) {
      const passwordIsValid = await bcrypt.compare(
        param.password,
        admin.password
      );

      if (passwordIsValid) {
        const token = jwt.sign(admin.email, process.env.JWT_KEY!);

        return token;
      }
    }
  }

  async check(token: string): Promise<Admin | undefined> {
    const payload = jwt.verify(token, process.env.JWT_KEY!);

    if (payload) {
      const admin = await prisma.admin.findUnique({
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

  async emailResetLink(email: string): Promise<void> {
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILER_API!,
    });

    const sentFrom = new Sender("you@yourdomain.com", "Your name");
    const recipients = [new Recipient(email)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("This is a Subject")
      .setHtml("<strong>This is the HTML content</strong>")
      .setText("This is the text content");

    await mailerSend.email.send(emailParams);
  }
}
