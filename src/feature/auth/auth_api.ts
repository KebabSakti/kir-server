
export type AuthAccountUpdateParam = {
  id: string;
  email: string;
  oldPassword: string;
  newPassword: string;
};

export type AuthValidateParam = {
  password: string;
  hash: string;
};

export type AuthLoginParam = {
  email: string;
  password: string;
};

export abstract class AuthApi {
  abstract update(param: AuthAccountUpdateParam): Promise<void>;
  abstract login(param: AuthLoginParam): Promise<string | undefined>;
  abstract check(token: string): Promise<boolean>;
  abstract emailResetLink(email: string): Promise<void>;
}
