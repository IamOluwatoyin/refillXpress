import api from "./client";

export const getVendorId = (data) => api.get("/vendor/getOne")