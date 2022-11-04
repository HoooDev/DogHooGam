// /* eslint-disable no-param-reassign */
// import axios from "axios";

// const BASE_URL = "https://dog-hoogam.site/chatbot";

// const API_CHAT = axios.create({
//   baseURL: BASE_URL
// });

// API_CHAT.interceptors.request.use(
//   (config) => {
//     if (config.headers) {
//       config.headers = {
//         ...config.headers,
//         withCredentials: true
//       };
//     }
//     return config;
//   },
//   (err) => {
//     console.error(err);
//     return Promise.reject(err);
//   }
// );

// export const getChatbot1 = async (input: string) => {
//   console.log(1234);
//   const res = await API_CHAT.get("/indata", {
//     params: { data: input }
//   });
//   return res.data;
// };

// export const getRankc = async () => {
//   const res = await API_CHAT.get("/rank/collection");
//   return res.data;
// };
