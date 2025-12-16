import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Automatically attach token to headers
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
