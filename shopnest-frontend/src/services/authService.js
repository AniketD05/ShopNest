import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

const login = (data) => {
  return axios.post(`${API_URL}/login`, data);
};

const register = (data) => {
  return axios.post(`${API_URL}/register`, data);
};

export default {
  login,
  register
};
