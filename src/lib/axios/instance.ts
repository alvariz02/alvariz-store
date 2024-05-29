// import axios from "axios";

// const headers = {
//   Accept: "application/json",
//   "Content-Type": "application/json", // Perbaikan kesalahan pengetikan
//   "Cache-Control": "no-cache",
//   Expires: 0,
// };

// const instance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers, // 60 detik
// });

// // Interceptor untuk request
// instance.interceptors.request.use(
//   (config) => {
//     // Anda bisa menambahkan log atau manipulasi config di sini
//     return config;
//   },
//   (error) => {
//     // Log kesalahan (opsional)
//     console.error("Request Error: ", error);
//     return Promise.reject(error);
//   }
// );

// // Interceptor untuk response
// instance.interceptors.response.use(
//   (response) => {
//     // Anda bisa menambahkan log atau manipulasi response di sini
//     return response;
//   },
//   (error) => {
//     // Log kesalahan (opsional)
//     console.error("Response Error: ", error);
//     return Promise.reject(error);
//   }
// );

// export default instance;

import axios from "axios";
import { error } from "console";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers,
});

instance.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error)
);
instance.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
