import { object, string } from "yup";

export const pdfCreateSchema = object({
  name: string().required("Nama tidak boleh kosong"),
  level: string().required("Level tidak boleh kosong"),
  number: string().required("Nomor tidak boleh kosong"),
});
