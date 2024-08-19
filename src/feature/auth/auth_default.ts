import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../common/prisma";
import { AuthAccountUpdateParam, AuthApi, AuthLoginParam } from "./auth_api";
import { MailerSend, Sender, Recipient, EmailParams } from "mailersend";

export class AuthDefault implements AuthApi {
  async update(param: AuthAccountUpdateParam): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async login(param: AuthLoginParam): Promise<string | undefined> {
    const admin = await prisma.admin.findFirst({
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

  async check(token: string): Promise<boolean> {
    const payload = jwt.verify(token, process.env.JWT_KEY!);

    if (payload) {
      const admin = await prisma.admin.findFirst({
        where: {
          email: payload.toString(),
        },
      });

      if (admin != null) {
        return true;
      }
    }

    return false;
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
