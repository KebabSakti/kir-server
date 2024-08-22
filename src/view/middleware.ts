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
        const admin = await authApi.check(token);

        if (admin != undefined) {
          res.locals.auth = admin;

          return next();
        }
      }
    }

    throw new Unauthorized("Akses tidak dizinkan");
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const whitelist = ["/"];
    const path = req.originalUrl;
    const lastIndex = path.indexOf("/", 1);

    const currentPath = path.substring(
      1,
      lastIndex < 0 ? undefined : lastIndex
    );

    const whitelisted = whitelist.some((path) => path.includes(currentPath));

    if (whitelisted) {
      return next();
    }

    if (!whitelisted) {
      const authorization = req.headers.authorization;

      if (authorization != undefined) {
        const payloads = authorization.split(" ");

        if (payloads.length == 2) {
          const token = payloads[1];
          const admin = await authApi.check(token);

          if (admin != undefined) {
            res.locals.auth = admin;

            return next();
          }
        }
      }
    }

    throw new Unauthorized("Akses tidak dizinkan");
  } catch (error: any) {
    return Failure(error, res);
  }
}
