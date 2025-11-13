import axios from "axios";
import api from "./client";

const BASEURL = import.meta.env.VITE_BASEURL;

const getToken = () => localStorage.getItem("token");

export const signupVendor = (data) => api.post("/vendor", data);

export const loginVendor = (data) => api.post("/vendor/login", data);

export const vendorEmailVerify = (data) => api.post("/vendor/verify", data);

export const vendorEmailVerifyResend = (data) =>
  api.post("/vendor/resend-otp", data);

export const vendorForgotPassword = (data) =>
  api.post("/vendor/forgot-password", data);

export const vendorForgotPasswordVerify = (data) =>
  api.post("/vendor/verify-forgot-password-otp", data);

export const vendorForgotPasswordOtpResend = (data) =>
  api.post("/vendor/vendorForgotPasswordOtpResend", data);

export const vendorResetPassword = (data) =>
  api.post("/vendor/reset-password", data);

export const vendorKycPost = (data, id) =>
  api.post(`/vendorKyc/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const vendorAcceptRejectOrder = ({ orderId, action, message }) =>
  api.post(`/vendor/accept/rejectOrder/${orderId}`, { action, message });

export const vendorSettings = async (vendorId, data) =>
  api.put(`/vendor/${vendorId}/settings`, data);

export const signUpUser = (data) => api.post("/user", data);

export const signInUser = (data) => api.post("/user/login", data);

export const verifyUser = (data) => api.post("/user/verify", data);

export const resendOtp = (data) => api.post("/user/resend-otp", data);

export const userCanceledOrder = async (orderId) => {
  const token = localStorage.getItem("token");
 await axios.patch(
    `${BASEURL}/orders/${orderId}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const handlePayment = (orderId) => {
  const token = getToken();
  if (!token) throw new Error("User token not found");
  return axios.post(
    `${BASEURL}/user/initializePayment/${orderId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const userProfileUpdate = async (data) => {
  const token = localStorage.getItem("token");
  return await axios.put(`${BASEURL}/user/update/Account`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const vendorUploadPic = async (data) => {
  return api.put("/vendor/account/update", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const vendorUpadeDetails = async (data) => {
  return api.put("/vendor/account/update", data, {
  });
};