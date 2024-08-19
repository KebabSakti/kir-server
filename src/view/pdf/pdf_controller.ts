import { Request, Response } from "express";
import { Failure } from "../../common/error";
import { pdfApi } from "../../feature/loader";
import { upload } from "../../helper/multer";
import { server } from "../../common/config";

export async function list(req: Request, res: Response) {
  try {
    const data = await pdfApi.list();

    return res.json(data);
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function create(req: Request, res: Response) {
  try {
    upload(req, res, (uploadedFiles) => {
      req.body.stamp = `${server}/${uploadedFiles[0]}`;
      req.body.signature = `${server}/${uploadedFiles[1]}`;

      pdfApi.create(req.body);

      return res.end();
    });
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function read(req: Request, res: Response) {
  try {
    const data = await pdfApi.read(Number(req.params.id));

    return res.json(data);
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function update(req: Request, res: Response) {
  try {
    //
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    //
  } catch (error: any) {
    return Failure(error, res);
  }
}
