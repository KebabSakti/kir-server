import { object, string } from "yup";

export const authLoginSchema = object({
  email: string()
    .email("Email tidak valid")
    .required("Email tidak boleh kosong"),
  password: string().required("Password tidak boleh kosong"),
});
