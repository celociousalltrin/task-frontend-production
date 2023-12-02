import axios from "./axios-utils";

// AUTH USER APIS
export const createUser = (data) => axios.post("/auth/create-user", data);

export const loginUser = (data) => axios.post("/auth/user-login", data);

export const generateUserOTP = (data) =>
  axios.post("/auth/generate-email-verification-otp", data);

export const verifyUserOTP = (data) =>
  axios.post("/auth/verify-email-verification-OTP", data);

export const userLogin = (data) => axios.post("/auth/user-login", data);

//AUTH ADMIN APIS
export const createAdminUser = (data) =>
  axios.post("/auth-admin/create-admin-user", data);

export const loginAdminUser = (data) =>
  axios.post("/auth-admin/admin-user-login", data);

export const generateAdminUserOTP = (data) =>
  axios.post("/auth/generate-email-verification-otp", data);

export const verifyAdminUserOTP = (data) =>
  axios.post("/auth-admin/verify-email-verification-OTP", data);

//USER API
export const verifyUser = () => axios.get("/user/verify-user");

//ADMIN USER API
export const verifyAdminUser = () => axios.get("/admin-user/verify-user");
export const getUsersList = () => axios.get("/admin-user/user-list");
//LOGOUT API
export const logout = () => axios.get("/logout");
