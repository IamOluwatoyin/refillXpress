import api from "./client";

export const getVendorId = (id) => api.get(`/vendor/getOneVendor/${id}`)

export const getSummary = () => api.get("/vendor/dashboard/summary")

export const getVendorPendingOrders = () => api.get("/vendor/getpendingOrders")


export const getAllVendorsOrders = () => api.get("/order/getAllVendorOrders")

export const getAllReviews =()=> api.get("/reviews")

export const getSummaryReviews =() =>api.get("/reviews/summary")

export const getVendorKyc = (id)=> api.get(`/vendorKyc/getOneVendorKyc/${id}`)

export const getAnalytics = (id ) => api.get(`/vendor/${id}/analytics`)

//for the other get you wont pass id if not needed you will leave prams empty.

