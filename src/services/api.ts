import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.10.6:3333/",
});

api.interceptors.response.use(function (data) {
  // console.log("teste -> ", data);
  console.log("Data -> ", data.status);

  return data;
});

export default api;
