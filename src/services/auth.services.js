import axios from './instance.service.js'

const baseUrl = window.location.hostname == "localhost"?"http://localhost:5000/auth": "https://drgtpqjf-5000.use2.devtunnels.ms/auth"

export const login = (data) => {
  return axios.post(baseUrl + "/login", data)
}

export const registerUser = (data) => {
  return axios.post(baseUrl + "/register", {userInfo:data})
}