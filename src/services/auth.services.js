import { baseUrl } from './config.services.js'
import axios from './instance.service.js'

const authBaseUrl = window.location.hostname == "localhost"?"http://localhost:5000/auth": baseUrl + "/auth"

export const login = (data) => {
  return axios.post(authBaseUrl + "/login", data)
}

export const registerUser = (data) => {
  return axios.post(authBaseUrl + "/register", {userInfo:data})
}