import { Request, Response } from "express";
import { Failure, Unauthorized } from "../../common/error";
import { authApi } from "../../feature/loader";
import { authLoginSchema } from "./auth_schema";

export async function login(req: Request, res: Response) {
  try {
    await authLoginSchema.validate(req.body);
    const token = await authApi.login(req.body);

    if (token != undefined) {
      return res.json({ token: token });
    }

    throw new Unauthorized();
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function update(req: Request, res: Response) {
  try {
    await authApi.update(req.body);

    return res.end();
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function emailResetLink(req: Request, res: Response) {
  try {
    await authApi.emailResetLink(req.body.email);

    return res.end();
  } catch (error: any) {
    return Failure(error, res);
  }
}
