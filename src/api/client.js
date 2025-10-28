import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(import.meta.env.VITE_VENDOR_TOKEN);
  if (token) {
    config.headers.Authorization =`Bearer ${token}`;
  }
  return config;
});


export default api;
