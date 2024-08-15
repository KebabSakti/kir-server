import { Admin } from "./admin";

export type AuthAccountUpdateParam = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

export type AuthValidateParam = {
  password: string;
  hash: string;
};

export abstract class AuthApi {
  abstract update(param: AuthAccountUpdateParam): Promise<void>;
  abstract validate(param: AuthValidateParam): Promise<boolean>;
  abstract find(email: string): Promise<Admin | undefined>;
  abstract emailResetLink(email: string): Promise<void>;
}
