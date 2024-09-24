import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const loggedUserJSON = localStorage.getItem("loggedUser"); // taking auth token from local Storage

    const { token } = JSON.parse(loggedUserJSON);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
