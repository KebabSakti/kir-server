import { NextFunction, Request, Response } from "express";
import { Failure, Unauthorized } from "../common/error";
import { authApi } from "../feature/loader";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;

    if (authorization != undefined) {
      const payloads = authorization.split(" ");

      if (payloads.length == 2) {
        const token = payloads[1];
        const tokenIsValid = await authApi.check(token);

        if (tokenIsValid) {
          return next();
        }
      }
    }

    throw new Unauthorized("Akses tidak dizinkan");
  } catch (error: any) {
    return Failure(error, res);
  }
}
