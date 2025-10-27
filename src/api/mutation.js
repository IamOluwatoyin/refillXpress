import api from "./client";

export const signupVendor = (data) => api.post("/vendor",data)

export const loginVendor = (data) => api.post("/vendor/login",data)

export const vendorEmailVerify = (data) => api.post("/vendor/verify",data)

export const vendorEmailVerifyResend = (data) => api.post("/vendor/resend-otp",data)

export const vendorForgotPassword = (data) => api.post("/vendor/forgot-password",data)

export const vendorForgotPasswordVerify = (data) => api.post("vendor_verify_forgot_password_otp")

export const vendorResetPassword = (data,config) => api.post("/vendor/reset-password/",data, config)
