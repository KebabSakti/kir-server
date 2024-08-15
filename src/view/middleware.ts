import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtKey } from "../common/config";
import { Failure, Unauthorized } from "../common/error";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;

    if (authorization != undefined) {
      const payloads = authorization.split(" ");

      if (payloads.length == 2) {
        const token = payloads[1];
        const auth = req.app.locals.auth;
        const decoded: any = jwt.verify(token, jwtKey);

        if (decoded?.email == auth?.email) {
          return next();
        }
      }
    }

    throw new Unauthorized();
  } catch (error: any) {
    return Failure(error, res);
  }
}
