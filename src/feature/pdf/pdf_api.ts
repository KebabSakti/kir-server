import { Pdf } from "./pdf";

export type PdfCreateParam = {
  name?: string;
  level?: string;
  number?: string;
  stamp?: string;
  signature?: string;
};

export type PdfUpdateParam = {
  id?: string;
  name?: string;
  level?: string;
  number?: string;
  stamp?: string;
  signature?: string;
};

export abstract class PdfApi {
  abstract list(): Promise<Pdf[]>;
  abstract create(param: PdfCreateParam): Promise<void>;
  abstract read(id: string): Promise<Pdf | undefined>;
  abstract update(param: PdfUpdateParam): Promise<void>;
  abstract remove(id: string): Promise<void>;
}
