import { randomUUID } from "crypto";
import { Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import { staticDir } from "../common/config";

const storage = multer.memoryStorage();
const multerInstance = multer({ storage });

export function upload(
  req: Request,
  res: Response,
  callback: (uploadedFiles: string[]) => void
) {
  multerInstance.array("file")(req, res, async () => {
    const uploadedFiles = [];

    for (const file of req.files as any) {
      const { buffer, originalname } = file;
      const ref = `${randomUUID()}-${originalname}`;

      await sharp(buffer)
        .png({ quality: 50 })
        .resize(800)
        .toFile(`./${staticDir}/${ref}`);

      uploadedFiles.push(ref);
    }

    callback(uploadedFiles);
  });
}
