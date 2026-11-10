import axios from "axios";


export const AxiosInstance = axios.create({
  baseURL: "https://hizbulla-association-server-site.vercel.app/api",
  // baseURL: "http://localhost:5000/api",
  timeout: 5000,
}); 


// This runs BEFORE every single request goes out
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 👈 Gets the freshest token instantly
    } else {
      delete config.headers.Authorization; // Clear it if logged out
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);