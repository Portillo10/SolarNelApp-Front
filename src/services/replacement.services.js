import axios from "./instance.service"

const baseUrl = window.location.hostname == "localhost"?"http://localhost:5000/replacement": "https://drgtpqjf-5000.use2.devtunnels.ms/replacement"

export const getTypes = () => {
  return axios.get(baseUrl + "/all_types")
}

export const addReplacement = (data) => {
  return axios.post(baseUrl + "/new", {replacement:data})
}

export const getReplacements = () => {
  return axios.get(baseUrl + "/all")
}

export const addTypeRequest = (data) => {
  return axios.post(baseUrl + "/new_type", data)
}