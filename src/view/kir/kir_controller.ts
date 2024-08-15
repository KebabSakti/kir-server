import { Request, Response } from "express";
import { Failure } from "../../common/error";
import { kirApi } from "../../feature/loader";

export async function list(req: Request, res: Response) {
  try {
    console.log(req.query);
    const query = req.query as any;

    const data = await kirApi.list({
      ...req.query,
      pagination: {
        skip: Number(query.pagination?.skip) ?? undefined,
        take: Number(query.pagination?.take) ?? undefined,
      },
    });

    return res.json(data);
  } catch (error: any) {
    return Failure(error, res);
  }
}
