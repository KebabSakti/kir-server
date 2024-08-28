import { AuthApi } from "./auth/auth_api";
import { AuthMysql } from "./auth/auth_mysql";
import { KirApi } from "./kir/kir_api";
import { KirMysql } from "./kir/kir_mysql";
import { PdfApi } from "./pdf/pdf_api";
import { PdfMysql } from "./pdf/pdf_mysql";

export const authApi: AuthApi = new AuthMysql();
export const kirApi: KirApi = new KirMysql();
export const pdfApi: PdfApi = new PdfMysql();
