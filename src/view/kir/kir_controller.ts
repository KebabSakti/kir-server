import { Request, Response } from "express";
import { Failure } from "../../common/error";
import { kirApi } from "../../feature/loader";
import { uploadImage } from "../../helper/uploader";

export async function list(req: Request, res: Response) {
  try {
    const data = await kirApi.list(req.query);

    return res.json(data);
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function create(req: Request, res: Response) {
  try {
    const uploadedFiles = await uploadImage(req.files as any);

    uploadedFiles.forEach((file) => {
      req.body[file.fieldName] = file.fileName;
    });

    await kirApi.create(req.body);

    return res.end();
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function read(req: Request, res: Response) {
  try {
    const data = await kirApi.read(req.params.id);

    return res.json(data);
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function update(req: Request, res: Response) {
  try {
    if (req.files != undefined) {
      const uploadedFiles = await uploadImage(req.files as any);

      uploadedFiles.forEach((file) => {
        req.body[file.fieldName] = file.fileName;
      });
    }

    await kirApi.update(req.body);

    return res.end();
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await kirApi.remove(req.body.id);

    return res.end();
  } catch (error: any) {
    return Failure(error, res);
  }
}

export async function certificate(req: Request, res: Response) {}
