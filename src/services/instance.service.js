import axios from "axios";
// import { API_URL } from "../config";

const instance = axios.create(
  {
    baseURL: "https://solarnelapp-back-dev-exkh.1.us-1.fl0.io",
    withCredentials: true
  }
)

export default instance;