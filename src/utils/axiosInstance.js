import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://hizbulla-association-server-site.vercel.app/api",
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${"getToken()"}`, // akhane token bosbe
  },
}); 

