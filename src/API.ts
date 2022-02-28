import axios, { AxiosInstance } from "axios";

export const mytoken = sessionStorage.getItem("mytoken");

export const URL: AxiosInstance = axios.create({
  baseURL: `${"http://3.36.75.239"}`,
  headers: {
    Authorization: `Bearer ${mytoken}`,
  },
});

// 원진님 http://3.36.75.239
// 강효님 http://hyoc.shop
// 수현님 http://54.180.142.123:3000
