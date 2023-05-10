import { MockMethod } from "vite-plugin-mock";

export default [
  {
    /** list all certs with key or not, should be in database */
    url: "/authority/listCerts",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {}
      };
    }
  },
  {
    /** load cert into system, in load conn, will load into strongswan is not in it, test in db */
    url: "/authority/addCert",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {}
      };
    }
  },
  {
    /** only del in db, (and do a clear cert and reload according to loading state in db ?) */
    url: "/authority/delCert",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {}
      };
    }
  } /** how to clear certs ? */
] as MockMethod[];
