/* eslint-disable no-param-reassign */
import axios from "axios";

// let token;

// if (typeof window !== "undefined") {
//   // Perform localStorage action
//   token = localStorage?.getItem("AccessToken");
// }

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 1000
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AccessToken") || "";
    if (config.headers) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (err) => {
    console.error(err);
    return Promise.reject(err);
  }
);

// instance.interceptors.response.use(
//   (response) => {
//     const res = response.data;
//     return res;
//   },
//   (err) => {
//     console.error(err);
//     return Promise.reject(err);
//   }
// );

export default instance;
