import { MockMethod } from "vite-plugin-mock";

type NetworkInfo = {
  /** 网口名 */
  interface: string;
  /** 网口地址 todo: 可能是一个list*/
  ipv4addr: string;
  /** `网口掩码` */
  netmask: number;
};

const networkInfo: NetworkInfo[] = [
  {
    interface: "eth0",
    ipv4addr: "192.168.1.1",
    netmask: 24
  },
  {
    interface: "eth1",
    ipv4addr: "192.168.2.1",
    netmask: 24
  }
];

export default [
  {
    url: "/getNetworkInfo",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          list: networkInfo
        }
      };
    }
  },
  {
    url: "/setNetworkInfo",
    method: "post",
    response: ({ body }) => {
      for (let i = 0; i < networkInfo.length; i++) {
        if (networkInfo[i].interface === body.interface) {
          networkInfo[i] = body;
        }
      }
      return {
        success: true
      };
    }
  }
] as MockMethod[];
