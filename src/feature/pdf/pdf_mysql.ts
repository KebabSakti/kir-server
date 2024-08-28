import dayjs from "dayjs";
import { MySql } from "../../helper/mysql";
import { Pdf } from "./pdf";
import { PdfApi, PdfCreateParam, PdfUpdateParam } from "./pdf_api";
import { randomUUID } from "crypto";

export class PdfMysql implements PdfApi {
  async list(): Promise<Pdf[]> {
    const data = await MySql.query(
      "select * from pdf where deleted is null order by created desc"
    );

    return data;
  }

  async create(param: PdfCreateParam): Promise<void> {
    await MySql.query("insert into pdf set ?", {
      ...param,
      id: randomUUID(),
      created: dayjs().toDate(),
    });
  }

  async read(id: string): Promise<Pdf | undefined> {
    const data = await MySql.query("select * from pdf where id = ?", [id]);

    return data[0];
  }

  async update(param: PdfUpdateParam): Promise<void> {
    const values: any = param;
    delete values.created;
    delete values.deleted;

    await MySql.query("update pdf set ? where ?", [
      { ...values, updated: dayjs().toDate() },
      { id: param.id },
    ]);
  }

  async remove(id: string): Promise<void> {
    await MySql.query("update pdf set ? where ?", [
      { deleted: dayjs().toDate() },
      { id: id },
    ]);
  }
}
