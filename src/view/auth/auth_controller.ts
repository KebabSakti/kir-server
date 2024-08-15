import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authApi } from "../../feature/loader";
import { authLoginSchema } from "./auth_schema";
import { jwtKey } from "../../common/config";
import { Failure, Unauthorized } from "../../common/error";

export async function login(req: Request, res: Response) {
  try {
    await authLoginSchema.validate(req.body);
    const { email, password } = req.body;
    const admin = await authApi.find(email);

    if (admin != undefined) {
      const userIsValid = await authApi.validate({
        password: password,
        hash: admin.password!,
      });

      if (userIsValid) {
        const token = jwt.sign({ email: admin.email }, jwtKey);
        req.app.locals.auth = { email: admin.email };

        return res.json({ token: token });
      }
    }

    throw new Unauthorized();
  } catch (error: any) {
    return Failure(error, res);
  }
}
