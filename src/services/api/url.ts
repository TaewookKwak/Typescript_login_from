const DEFAULT_SERVER_URL = "http://localhost:3003";
const DEFAULT_SERVER_API = "/api";
const LOGIN = "/login";

interface ServiceInterface {
  getUrl: (page: string) => string;
  getDefaultHeaders: () => object;
}

const service: ServiceInterface = {
  getUrl: (page) => {
    const lowerPage = page.toLowerCase();
    switch (lowerPage) {
      case "login":
        return `${DEFAULT_SERVER_URL}${DEFAULT_SERVER_API}${LOGIN}`;
      default:
        return "";
    }
  },
  getDefaultHeaders: (): {} => {
    return { "Content-Type": "application/json" };
  },
};

export default service;
