import axios from "axios";

import { refreshAccessToken } from "@/utils/helpers";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("_bl_tk");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status || 500;
    const defaultMessage = "An unexpected error occurred.";

    if (error.response?.status === 401) {
      const newToken = await refreshAccessToken();

      if (newToken) {
        localStorage.setItem("_bl_tk", newToken);
        // Update the default Authorization header
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        // Retry the original request with new token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config);
      }
    }

    return Promise.reject({
      success: false,
      message: error.response?.data?.meta?.message || defaultMessage,
      status,
    });
  }
);

export default api;
