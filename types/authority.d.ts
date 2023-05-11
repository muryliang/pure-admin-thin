type CertInfo = {
  /** ike 名字 */
  dn: string;
};

type CertResult = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<CertInfo>;
  };
};
