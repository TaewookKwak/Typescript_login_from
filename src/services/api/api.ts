import axios, { AxiosError } from "axios";
import service from "@/services/api/url";

interface PayloadDataset {
  group?: string;
}

interface PayloadDatasetInfo {
  group?: string;
  dataset_name?: string;
}

export const api = axios.create({
  baseURL: "http://192.168.219.118:8093",
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});

axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    console.log(status);

    switch (status) {
      case 400:
        console.error(data);
        break;

      case 401:
        console.error("unauthorised");
        break;

      case 404:
        console.error("/not-found");
        break;

      case 500:
        console.error("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

export const getDatasetList = async () => {
  return await api
    .get(`/api/action/get-dataset-list`, {
      params: {
        group: "group",
      },
    })
    .then((res: any) => res.data);
};

export const getDatasetListInfo = async (payload: PayloadDatasetInfo) => {
  return await api
    .get(`/api/action/get-dataset-info`, {
      params: {
        ...payload,
      },
    })
    .then((res: any) => res.data);
};

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
    let response;
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
