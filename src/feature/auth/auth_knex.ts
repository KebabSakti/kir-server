import { Admin } from "./admin";
import { AuthAccountUpdateParam, AuthApi, AuthLoginParam } from "./auth_api";

export class AuthKnex implements AuthApi {
  update(param: AuthAccountUpdateParam): Promise<void> {
    throw new Error("Method not implemented.");
  }

  login(param: AuthLoginParam): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }

  check(token: string): Promise<Admin | undefined> {
    throw new Error("Method not implemented.");
  }

  emailResetLink(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
