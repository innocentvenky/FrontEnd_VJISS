import axios from "axios";
import { getLoadingSetter } from "../Loading/loadingHelper";

const api = axios.create({
  baseURL: "https://vjinnovative-company.onrender.com/",
});

/* ================= REQUEST ================= */
api.interceptors.request.use(
  (config) => {
    const setLoading = getLoadingSetter();
    setLoading?.(true);

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ JSON only for non-FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    } else {
      delete config.headers["Content-Type"]; // 🔥 IMPORTANT
    }

    return config;
  },
  (error) => {
    getLoadingSetter()?.(false);
    return Promise.reject(error);
  }
);

/* ================= RESPONSE ================= */
api.interceptors.response.use(
  (response) => {
    getLoadingSetter()?.(false);
    return response;
  },
  (error) => {
    getLoadingSetter()?.(false);

    // 🟢 TREAT EMPTY SUCCESS AS SUCCESS
    if (
      error.response &&
      [200, 201, 204].includes(error.response.status)
    ) {
      return Promise.resolve(error.response);
    }

    return Promise.reject(error);
  }
);

export default api;
