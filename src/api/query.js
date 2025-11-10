import axios from "axios";
import api from "./client";

const BASEURL = import.meta.env.VITE_BASEURL;


const getToken = () => localStorage.getItem("vendor_token");


export const getVendorId = (id) => api.get(`/vendor/getOneVendor/${id}`);

export const getSummary = () => api.get("/vendor/dashboard/summary");

export const getVendorPendingOrders = () => api.get("/vendor/getpendingOrders");

export const getAllVendorsOrders = () => api.get("/order/getAllVendorOrders");

export const getAllReviews = () => api.get("/reviews");

export const getSummaryReviews = () => api.get("/reviews/summary");

export const getVendorKyc = (id) => api.get(`/vendorKyc/getOneVendorKyc/${id}`);

export const getAnalytics = (id) => api.get(`/vendor/${id}/analytics`);

export const getNearbyVendors = () => {
  const token = getToken();
  return axios.get(`${BASEURL}/user/getNearbyVendors`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const getRecentOrders = () => {
  const token = localStorage.getItem("token"); 
  return axios.get(`${BASEURL}/order/getRecentOrders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getActiveOrders = (userId) => {
  const token = localStorage.getItem("token");
  return axios.get(`${BASEURL}/orders/getActiveOrders/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createOrder = (data) => {
  const token = getToken();
  return axios.post(`${BASEURL}/order/create-order`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(`${BASEURL}/user/getUserProfile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllOrders = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(`${BASEURL}/orders/getOrderByStatus`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const AcceptOrderbyRider = async()=>{
  const token = localStorage.getItem("token")
  return await axios.get(`${BASEURL}/orders/confirmOrder/{orderId}/{userId}`,{
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
}


