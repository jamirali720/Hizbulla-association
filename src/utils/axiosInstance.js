import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${"getToken()"}`, // akhane token bosbe
  },
}); 

