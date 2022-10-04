import axios from "axios";
import service from "@/services/api/url";

// type requestProp = (page?: string, param?: any, option?: {
// }) => any;
// type optionProp = { header: any, type : string}
/**
 * 로그인
 */
export const login = async (param: any = null) => {
  return await request(service.getUrl("login"), param, {
    type: "post",
  });
};

const request = async (
  page: string,
  param: any = null,
  option: any = { header: null, type: "get" }
) => {
  try {
    const header =
      option.header !== null && option.header !== undefined
        ? option.header
        : service.getDefaultHeaders();
    const reqOption = {
      headers: header,
      timeout: 1000 * 10,
      params: {},
    };
    let response = null;
    if (option.type === "post") {
      response = await axios.post(`${page}`, param, reqOption);
    } else if (option.type === "put") {
      response = await axios.put(`${page}`, param, reqOption);
    } else if (option.type === "delete") {
      reqOption.params = param;
      response = await axios.delete(`${page}`, reqOption);
    } else if (option.type === "form") {
      reqOption.headers["Content-type"] = "multipart/form-data";
      const formdata = new FormData();
      for (let attr in param) {
        formdata.append(attr, param[attr]);
      }
      response = await axios.post(
        page,
        formdata,

        {
          headers: reqOption.headers,
          timeout: reqOption.timeout,
        }
      );
    } else {
      reqOption.params = param;
      response = await axios.get(`${page}`, reqOption);
    }
    return response.data;
  } catch {
    return;
  }
};
