import bcrypt from "bcryptjs";
import { prisma } from "../../common/prisma";
import { Admin } from "./admin";
import { AuthAccountUpdateParam, AuthApi, AuthValidateParam } from "./auth_api";

export class AuthDefault implements AuthApi {
  async update(param: AuthAccountUpdateParam): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async validate(param: AuthValidateParam): Promise<boolean> {
    const status = await bcrypt.compare(param.password, param.hash!);

    return status;
  }

  async find(email: string): Promise<Admin | undefined> {
    const admin = await prisma.admin.findFirst({
      where: { email: email },
    });

    return admin as Admin | undefined;
  }

  async emailResetLink(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
