import { randomUUID } from "crypto";
import sharp from "sharp";
import { staticDir } from "../common/config";

export type UploadedFile = {
  fieldName: string;
  fileName: string;
};

export async function uploadImage(
  files: File[],
  format: string = "jpg"
): Promise<UploadedFile[]> {
  const uploadedFiles: UploadedFile[] = [];

  for (const file of files as any) {
    const { buffer, originalname, fieldname } = file;
    const fileName = `${randomUUID()}-${originalname}`;
    const image = sharp(buffer);

    if (format == "jpg") {
      image.jpeg({ quality: 50 });
    }

    if (format == "png") {
      image.png({ quality: 50 });
    }

    await image.resize(800).toFile(`./${staticDir}/${fileName}`);

    uploadedFiles.push({
      fieldName: fieldname,
      fileName: fileName,
    });
  }

  return uploadedFiles;
}
