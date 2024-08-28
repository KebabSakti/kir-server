import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { randomNumber } from "../../common/utility";
import { MySql, pool } from "../../helper/mysql";
import { Kir } from "./kir";
import {
  KirApi,
  KirCreateParam,
  KirListParam,
  KirUpdateParam,
} from "./kir_api";

export class KirMysql implements KirApi {
  async create(param: KirCreateParam): Promise<void> {
    const id = randomUUID();
    const certificate = randomNumber();
    const expiryDate = dayjs().add(6, "month").toDate();

    await MySql.query("insert into kir set ?", {
      ...param,
      id: id,
      certificateNumber: certificate.toString(),
      expiryDate: expiryDate,
    });
  }

  async read(id: string): Promise<Kir | undefined> {
    const data = await MySql.query("select * from kir where id = ?", [id]);

    return data[0];
  }

  async update(param: KirUpdateParam): Promise<void> {
    const values: any = { ...param, updated: dayjs().toDate() };
    delete values.created;
    delete values.deleted;
    delete values.expiryDate;

    await MySql.query("update kir set ? where ?", [values, { id: param.id }]);
  }

  async remove(id: string): Promise<void> {
    await MySql.query("update kir set ? where ?", [
      { deleted: dayjs().toDate() },
      { id: id },
    ]);
  }

  async list(param?: KirListParam): Promise<Kir[]> {
    let sql = "select * from kir where deleted is null";

    if (param?.certificateNumber != undefined) {
      sql += ` and certificateNumber like ${pool.escape(
        `%${param.certificateNumber}%`
      )}`;
    }

    sql += " order by created desc";

    if (param?.pagination != undefined) {
      sql += ` limit ${pool.escape(
        Number(param.pagination.take)
      )} offset ${pool.escape(Number(param.pagination.skip))}`;
    }

    const data = await MySql.query(sql);

    return data;
  }

  async find(certificateNumber: string): Promise<Kir | undefined> {
    const data = await MySql.query(
      "select * from kir where certificateNumber = ?",
      [certificateNumber]
    );

    return data[0];
  }
}
