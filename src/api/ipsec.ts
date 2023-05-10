import { http } from "@/utils/http";

export type IpsecResult = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<SaInfo>;
  };
};

export const getSas = () => {
  return http.request<IpsecResult>("get", "/ipsec/listSas");
};

export const getConn = data => {
  return http.request<IpsecResult>("get", "/ipsec/getConn", { data });
};

export const listConns = () => {
  return http.request<IpsecResult>("get", "/ipsec/listConns");
};

export const addTunnels = data => {
  return http.request<IpsecResult>("post", "/ipsec/addTunnels", { data });
};

export const delTunnels = data => {
  return http.request<IpsecResult>("post", "/ipsec/delTunnels", { data });
};

export const startTunnels = data => {
  return http.request<IpsecResult>("post", "/ipsec/startTunnels", { data });
};

export const stopTunnels = data => {
  return http.request<IpsecResult>("post", "/ipsec/stopTunnels", { data });
};
