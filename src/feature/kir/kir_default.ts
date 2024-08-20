import dayjs from "dayjs";
import { prisma } from "../../common/prisma";
import { randomNumber } from "../../common/utility";
import { Kir } from "./kir";
import {
  KirApi,
  KirCreateParam,
  KirListParam,
  KirUpdateParam,
} from "./kir_api";

export class KirDefault implements KirApi {
  async create(param: KirCreateParam): Promise<void> {
    const certificate = randomNumber();
    const expiryDate = dayjs().add(6, "month").toDate();

    await prisma.kir.create({
      data: {
        ...param,
        certificateNumber: certificate.toString(),
        expiryDate: expiryDate,
      },
    });
  }

  async read(id: string): Promise<Kir | undefined> {
    const data: any = await prisma.kir.findUnique({
      where: { id: id },
    });

    return data;
  }

  async update(param: KirUpdateParam): Promise<void> {
    await prisma.kir.update({
      where: {
        id: param.id,
      },
      data: { ...param, updated: dayjs().toDate(), deleted: null },
    });
  }

  async remove(id: string): Promise<void> {
    await prisma.kir.update({
      where: { id: id },
      data: { deleted: dayjs().toDate() },
    });
  }

  async list(param?: KirListParam): Promise<Kir[]> {
    let filter: any = {
      where: {
        deleted: null,
      },
    };

    if (param?.pagination != undefined) {
      const paginate = {
        skip: Number(param.pagination.skip),
        take: Number(param.pagination.take),
      };

      filter = { ...filter, ...paginate };
    }

    if (param?.certificateNumber != undefined) {
      filter["where"] = {
        ...filter.where,
        certificateNumber: {
          contains: param?.certificateNumber,
        },
      };
    }

    const data: any = await prisma.kir.findMany({
      ...filter,
      orderBy: {
        created: "desc",
      },
    });

    return data;
  }

  async find(certificateNumber: string): Promise<Kir | undefined> {
    const data: any = await prisma.kir.findFirst({
      where: { certificateNumber: certificateNumber },
    });

    return data;
  }
}
