import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://task-manager-1mvn.onrender.com/api"
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
