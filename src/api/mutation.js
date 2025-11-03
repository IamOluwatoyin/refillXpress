import api from "./client";

export const signupVendor = (data) => api.post("/vendor",data)

export const loginVendor = (data) => api.post("/vendor/login",data)

export const vendorEmailVerify = (data) => api.post("/vendor/verify",data)

export const vendorEmailVerifyResend = (data) => api.post("/vendor/resend-otp",data)

export const vendorForgotPassword = (data) => api.post("/vendor/forgot-password",data)

export const vendorForgotPasswordVerify = (data) => api.post("/vendor/verify-forgot-password-otp", data)

export const vendorForgotPasswordOtpResend  = (data) => api.post("/vendor/vendorForgotPasswordOtpResend",data)

export const vendorResetPassword = (data) => api.post("/vendor/reset-password",data)

export const vendorKycPost = (data,id) =>api.post(`/vendorKyc/${id}`,data,{
  headers:{
     "Content-Type": "multipart/form-data",
  }
})

export const vendorAcceptRejectOrder = ({ orderId, action }) =>
  api.post(`/vendor/accept/rejectOrder/${orderId}`, { action });

