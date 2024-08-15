export type PdfCreateParam = {
  name?: string;
  level?: string;
  number?: string;
  stamp?: string;
  signature?: string;
};

export abstract class PdfApi {
  abstract create(param: PdfCreateParam): Promise<void>;
}
