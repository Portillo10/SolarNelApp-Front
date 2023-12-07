import { baseUrl } from "./config.services"
import axios from "./instance.service"

const replacementBaseUrl = window.location.hostname == "localhost"?"http://localhost:5000/replacement": baseUrl + "/replacement"

export const getTypes = () => {
  return axios.get(replacementBaseUrl + "/all_types")
}

export const addReplacement = (data) => {
  return axios.post(replacementBaseUrl + "/new", {replacement:data})
}

export const getReplacements = () => {
  return axios.get(replacementBaseUrl + "/all")
}

export const addTypeRequest = (data) => {
  return axios.post(replacementBaseUrl + "/new_type", data)
}