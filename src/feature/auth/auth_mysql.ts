import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { BadRequest, NotFound } from "../../common/error";
import { MySql } from "./../../helper/mysql";
import { Admin } from "./admin";
import { AuthAccountUpdateParam, AuthApi, AuthLoginParam } from "./auth_api";

export class AuthMysql implements AuthApi {
  async update(param: AuthAccountUpdateParam): Promise<void> {
    const admin = await MySql.query("select * from admin where email = ?", [
      param.email,
    ]);

    if (admin.length == 0) {
      throw new NotFound("User tidak ditemukan");
    }

    const passwordIsValid = await bcrypt.compare(
      param.oldPassword,
      admin[0].password
    );

    if (!passwordIsValid) {
      throw new BadRequest("Password lama anda salah");
    }

    const hashedPass = bcrypt.hashSync(param.newPassword, 10);

    await MySql.query(
      "update admin set password = ?, updated = ? where email = ?",
      [hashedPass, dayjs().toDate(), param.email]
    );
  }

  async login(param: AuthLoginParam): Promise<string | undefined> {
    const admin = await MySql.query("select * from admin where email = ?", [
      param.email,
    ]);

    if (admin.length > 0) {
      const passwordIsValid = await bcrypt.compare(
        param.password,
        admin[0].password
      );

      if (passwordIsValid) {
        const token = jwt.sign(admin[0].email, process.env.JWT_KEY!);

        return token;
      }
    }
  }

  async check(token: string): Promise<Admin | undefined> {
    const payload = jwt.verify(token, process.env.JWT_KEY!);

    if (payload) {
      const admin = await MySql.query(
        "select id, email from admin where email = ?",
        [payload.toString()]
      );

      return admin[0];
    }
  }

  emailResetLink(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
