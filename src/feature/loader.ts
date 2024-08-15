import { AuthApi } from "./auth/auth_api";
import { AuthDefault } from "./auth/auth_default";
import { KirApi } from "./kir/kir_api";
import { KirDefault } from "./kir/kir_default";

export const authApi: AuthApi = new AuthDefault();
export const kirApi: KirApi = new KirDefault();
