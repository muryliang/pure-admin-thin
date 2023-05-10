import { http } from "@/utils/http";

type NetworkInfo = {
  /** 网口名 */
  interface: string;
  /** 网口地址 todo: 可能是一个list*/
  ipv4addr: string;
  /** `网口掩码` */
  netmask: number;
};

export type SystemResult = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<NetworkInfo>;
  };
};

export const getNetworkInfo = () => {
  return http.request<SystemResult>("get", "/getNetworkInfo");
};

export const setNetworkInfo = (data: NetworkInfo) => {
  return http.request<SystemResult>("post", "/setNetworkInfo", { data });
};
