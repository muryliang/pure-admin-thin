import { http } from "@/utils/http";

export const listCerts = () => {
  return http.request<CertResult>("get", "/authority/listCerts");
};

export const addCert = data => {
  const sendData = new FormData(); // formdata auto use multipart/form-data
  sendData.append("filename", "one");
  sendData.append("filedata", data);
  return http.request<CertResult>(
    "post",
    "/authority/addCert",
    { params: { id: 1234 } },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: {
        file: {
          name: "f1",
          size: 128
        },
        filedata: data
      }
    }
  );
};

export const delCert = data => {
  return http.request<CertResult>("post", "/authority/delCert", { data });
};
