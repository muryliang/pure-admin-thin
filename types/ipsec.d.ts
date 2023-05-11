type SaInfo = {
  /** ike 名字 */
  ike: string;

  /** children name */
  children: Array<String>;
};

type IpsecResult = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<SaInfo>;
  };
};
