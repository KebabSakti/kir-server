import { prisma } from "../../common/prisma";
import { Kir } from "./kir";
import {
  KirApi,
  KirCreateParam,
  KirListParam,
  KirUpdateParam,
} from "./kir_api";

export class KirDefault implements KirApi {
  async create(param: KirCreateParam): Promise<void> {
    await prisma.kir.create({
      data: param,
    });
  }

  async read(id: string): Promise<Kir | undefined> {
    const data: any = await prisma.kir.findUnique({
      where: { id: Number(id) },
    });

    return data;
  }

  async update(param: KirUpdateParam): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async remove(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async list(param?: KirListParam): Promise<Kir[]> {
    const data: any = await prisma.kir.findMany({
      ...(param?.pagination as any),
      where: {
        certificateNumber: { contains: param?.certificateNumber },
      },
    });

    return data;
  }

  async print(certificateNumber: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
