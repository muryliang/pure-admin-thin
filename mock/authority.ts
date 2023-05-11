import { MockMethod } from "vite-plugin-mock";

/**
 *
 * KeyInfo {
 *   name: string
 *   certId: string // ref to certinfo.name
 * }
 *
 * CertInfo {
 *   name: string
 *   keyId: string // ref to keyinfo.name
 * }
 *
 * listCert {
 *   get
 *   arg: {}
 *   resp: {
 *     error: string
 *     data: {
 *       list: certList<Array<CertInfo>>
 *     }
 *   }
 * }
 *
 * importCert {
 *   post
 *   arg: {cert: CertInfo}
 *   resp: {
 *     error: string
 *   }
 * }
 *
 * importEncCertAndKey {
 *   post
 *   arg: {
 *    cert: CertInfo
 *    enckey: datablob
 *   }
 *   resp: {
 *     error: string
 *   }
 * }
 *
 * delCert {
 *   post
 *   arg: {cert: CertInfo}
 *   resp: {
 *     error: string
 *   }
 * }
 *
 * exportCert {
 *   get
 *   arg: {cert: CertInfo}
 *   resp: {
 *    see vue-pure-admin's able/download for how to download file
 *   }
 * }
 *
 * exportCsr {
 *   get
 *   arg: {key: KeyInfo}
 *   resp: {
 *    download csr file
 *   }
 * }
 *
 * generateSelfSigned {
 *   post
 *   arg: {key: KeyInfo}
 *   resp: {
 *     error: string
 *   }
 * }
 *
 * generateKey {
 *   post
 *   arg: {key: KeyInfo}
 *   resp: {
 *     error: string
 *   }
 * }
 *
 * listKey {
 *   get
 *   arg: {}
 *   resp: {
 *     error: string
 *     list: Array<KeyInfo>
 *   }
 * }
 */
const certInfos: CertInfo[] = [
  {
    dn: "cert1"
  },
  {
    dn: "cert2"
  }
];
export default [
  {
    /** list all certs with key or not, should be in database */
    url: "/authority/listCerts",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          list: certInfos
        }
      };
    }
  },
  {
    /** load cert into system, in load conn, will load into strongswan is not in it, test in db */
    url: "/authority/addCert",
    method: "post",
    response: data => {
      console.log(data);
      return {
        success: true,
        data: {}
      };
    }
    /*rawResponse: async (req, res) => {
      let reqbody = "";
      await new Promise(resolve => {
        req.on("data", chunk => {
          reqbody += chunk;
        });
        req.on("end", () => resolve(undefined));
      });
      let form = new FormData(reqbody);
      console.log("body is ", typeof reqbody);
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 200;
      res.end(`hello, world`);
    }*/
  },
  {
    /** only del in db, (and do a clear cert and reload according to loading state in db ?) */
    url: "/authority/delCert",
    method: "post",
    response: () => {
      return {
        success: true,
        data: {}
      };
    }
  } /** how to clear certs ? */
] as MockMethod[];
