import axios from "axios";
import { appRouter } from "../utils/common-data";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_API_URL;

axios.interceptors.request.use(
  function (config) {
    document.body.classList.add("loading-indicator");

    const storedAccessToken = localStorage.getItem("access_token");
    if (!!storedAccessToken)
      config.headers.Authorization = `Bearer ${storedAccessToken}`;

    config.withCredentials = true;
    return config;
  },
  function (error) {
    console.log("🚀 ~ file: axios-utils.jsx:21 ~ error:", error);
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (!!response.data.new_access_token) {
      localStorage.setItem("access_token", response.data.new_access_token);
    }

    document.body.classList.remove("loading-indicator");
    return response;
  },
  (error) => {
    console.log("🚀 ~ file: axios-utils.jsx:36 ~ error:", error);
    document.body.classList.remove("loading-indicator");
    if (error.response.status === 401) {
      appRouter.navigate("/logout", {
        state: { is_authenticated_error: true },
      });
    }
    return Promise.reject(error?.response);
  }
);

export default axios;
