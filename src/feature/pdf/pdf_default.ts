import { prisma } from "../../common/prisma";
import { PdfApi, PdfCreateParam } from "./pdf_api";

export class PdfDefault implements PdfApi {
  async create(param: PdfCreateParam): Promise<void> {
    await prisma.pdf.create({ data: param });
  }
}
