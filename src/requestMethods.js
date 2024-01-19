import axios from "axios";

const BASE_URL = "http://localhost:8000/3bs/api";
const TOKEN = JSON.parse(localStorage.getItem("user"))?.token;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: TOKEN,
  },
});
