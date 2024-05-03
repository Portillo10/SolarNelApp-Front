import axios from "axios";
// import { API_URL } from "../config";

const instance = axios.create(
  {
    baseURL: "https://solarnelapp-back.onrender.com",
    withCredentials: true
  }
)

export default instance;