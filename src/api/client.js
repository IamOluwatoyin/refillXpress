import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    "Content-Type": "application/json",
   
  },
});
api.interceptors.request.use((config) => {
  
  const vendorToken = localStorage.getItem(import.meta.env.VITE_VENDOR_TOKEN);

  const userToken = localStorage.getItem("token");

  const token = vendorToken || userToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
