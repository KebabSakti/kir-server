import { prisma } from "../../common/prisma";
import { Pdf } from "./pdf";
import { PdfApi, PdfCreateParam, PdfUpdateParam } from "./pdf_api";

export class PdfDefault implements PdfApi {
  async list(): Promise<Pdf[]> {
    const result = await prisma.pdf.findMany({
      where: { deleted: null },
    });

    const data = result as Pdf[];

    return data;
  }

  async create(param: PdfCreateParam): Promise<void> {
    await prisma.pdf.create({
      data: param,
    });
  }

  async read(id: number): Promise<Pdf | undefined> {
    const result = await prisma.pdf.findUnique({
      where: { id: id },
    });

    const data = result as Pdf | undefined;

    return data;
  }

  async update(param: PdfUpdateParam): Promise<void> {
    await prisma.pdf.update({
      where: { id: param.id },
      data: { ...param, updated: new Date() },
    });
  }

  async remove(id: number): Promise<void> {
    await prisma.pdf.delete({
      where: { id: id },
    });
  }
}
