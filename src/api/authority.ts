import { http } from "@/utils/http";

export type AuthorityResult = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<string>;
  };
};

export const listCerts = () => {
  return http.request<AuthorityResult>("get", "/authority/listCerts");
};

export const addCert = data => {
  return http.request<AuthorityResult>("post", "/ipsec/addCert", { data });
};

export const delCert = data => {
  return http.request<AuthorityResult>("post", "/ipsec/delCert", { data });
};
