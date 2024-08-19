import { Pdf } from "./pdf";

export type PdfCreateParam = {
  name?: string;
  level?: string;
  number?: string;
  stamp?: string;
  signature?: string;
};

export type PdfUpdateParam = {
  id?: number;
  name?: string;
  level?: string;
  number?: string;
  stamp?: string;
  signature?: string;
};

export abstract class PdfApi {
  abstract list(): Promise<Pdf[]>;
  abstract create(param: PdfCreateParam): Promise<void>;
  abstract read(id: number): Promise<Pdf | undefined>;
  abstract update(param: PdfUpdateParam): Promise<void>;
  abstract remove(id: number): Promise<void>;
}
