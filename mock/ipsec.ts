import { MockMethod } from "vite-plugin-mock";

const saInfos: SaInfo[] = [
  {
    ike: "ike1",
    children: ["child1_1", "child1_2"]
  },
  {
    ike: "ike2",
    children: ["child2_1", "child2_2"]
  }
];

export default [
  {
    /** list all sa and show detail here */
    url: "/ipsec/listSas",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          list: saInfos
        }
      };
    }
  },
  {
    /** use get conn */
    url: "/ipsec/listConns",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          list: saInfos
        }
      };
    }
  },
  {
    /** use get conns(tunnels) of specific ike name */
    url: "/ipsec/getConn",
    method: "get",
    response: ({ body }) => {
      const saResult: SaInfo[] = [];
      for (const saInfo of saInfos) {
        if (saInfo.ike === body.ike) {
          saResult.unshift(saInfo);
        }
      }
      return {
        success: true,
        data: saResult
      };
    }
  },
  {
    /** use add conn {ike, child} */
    url: "/ipsec/addTunnels",
    method: "post",
    response: ({ body }) => {
      const ike_found = saInfos.findIndex(item => item.ike === body.ike);
      if (ike_found !== -1) {
        const child_found = saInfos[ike_found].children.findIndex(
          item => item == body.child
        );
        if (child_found === -1) {
          saInfos[ike_found].children.push(body.child);
        } else {
          // nothing todo here
        }
      } else {
        saInfos.push({
          ike: body.ike,
          children: [body.child]
        });
      }

      return {
        success: true
      };
    }
  },
  {
    /** use del conn {ike, child} */
    url: "/ipsec/delTunnels",
    method: "post",
    response: ({ body }) => {
      const ike_index = saInfos.findIndex(item => item.ike === body.ike);
      if (ike_index !== -1) {
        if (!body.child) {
          // remove whole ike
          saInfos.splice(ike_index, 1);
        } else {
          const child_index = saInfos[ike_index].children.findIndex(
            item => item === body.child
          );
          if (child_index !== -1) {
            // remove child
            saInfos[ike_index].children.splice(child_index, 1);
          }
        }
      }
      return {
        success: true
      };
    }
  },
  {
    url: "/ipsec/startTunnels",
    method: "post",
    response: ({ body }) => {
      body.list.forEach(tunnel =>
        console.log(`${tunnel.ike}/${tunnel.child} started`)
      );
      return {
        success: true
      };
    }
  },
  {
    url: "/ipsec/stopTunnels",
    method: "post",
    response: ({ body }) => {
      body.list.forEach(tunnel =>
        console.log(`${tunnel.ike}/${tunnel.child} stopped`)
      );
      return {
        success: true
      };
    }
  }
] as MockMethod[];
