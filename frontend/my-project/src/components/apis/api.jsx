import axios from "axios";
import { getLoadingSetter } from "../Loading/loadingHelper";

const api = axios.create({
  baseURL: "https://vjinnovative-company.onrender.com/",
});

/* ================= REQUEST ================= */
api.interceptors.request.use(
  (config) => {
    const setLoading = getLoadingSetter();
    setLoading?.(true); // 🔥 START LOADER

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Set JSON only if NOT FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    const setLoading = getLoadingSetter();
    setLoading?.(false); // ❌ STOP LOADER ON ERROR
    return Promise.reject(error);
  }
);

/* ================= RESPONSE ================= */
api.interceptors.response.use(
  (response) => {
    const setLoading = getLoadingSetter();
    setLoading?.(false); // ✅ STOP LOADER
    return response;
  },
  (error) => {
    const setLoading = getLoadingSetter();
    setLoading?.(false); // ❌ STOP LOADER
    return Promise.reject(error);
  }
);

export default api;




// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://vjiss-compnay.onrender.com/",
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // ✅ SET Content-Type ONLY IF NOT FormData
//     if (!(config.data instanceof FormData)) {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;