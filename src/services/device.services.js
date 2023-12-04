import axios from "./instance.service"

const baseUrl = window.location.hostname == "localhost"?"http://localhost:5000/device": "https://drgtpqjf-5000.use2.devtunnels.ms/device"


export const getAllDevices = async () => {
  return await axios.get(baseUrl + "/all")
}

export const getDevice = async (deviceId) => {
  return await axios.get(baseUrl + `/one/${deviceId}`)
}

export const getDeviceBrands = async () => {
  return await axios.get(baseUrl + `/brands`)
}

export const getLastNumberCode = async () => {
  return await axios.get(baseUrl + "/number_code")
}

export const addDevice = async (device) => {
  return await axios.post(baseUrl, {device})
}

export const getDeviceIds = async (quantity, numberCode ) => {
  return await axios.get(baseUrl + `/getid${quantity && "?quantity="+quantity}${numberCode && "&numberCode="+numberCode}`)
}

export const repairDevice = async (data) => {
  return await axios.post(baseUrl + "/repair", {...data, token:localStorage.getItem("token")})
}

export const updateStateRequest = async (deviceId) => {
  return await axios.put(baseUrl + "/update_state/" + deviceId)
}