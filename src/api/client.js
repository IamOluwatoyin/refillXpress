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

api.interceptors.request.use((config) => {
  const vendorId = localStorage.getItem(import.meta.env.VITE_VENDOR_ID);
  
  if (vendorId) {
    config.headers.Authorization = `Bearer ${vendorId}`;
  }

  return config;
});

export default api;
