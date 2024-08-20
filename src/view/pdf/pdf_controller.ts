import { Request, Response } from "express";
import { Failure } from "../../common/error";
import { pdfApi } from "../../feature/loader";
import { uploadImage } from "../../helper/uploader";

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
    const uploadedFiles = await uploadImage(req.files as any, "png");

    uploadedFiles.forEach((file) => {
      req.body[file.fieldName] = file.fileName;
    });

    pdfApi.create(req.body);

    return res.end();
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function read(req: Request, res: Response) {
  try {
    const data = await pdfApi.read(req.params.id);

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
