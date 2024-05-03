import { baseUrl } from "./config.services"
import axios from "./instance.service"

const deviceBaseUrl = baseUrl + "/device"


export const getAllDevices = async () => {
  return await axios.get(deviceBaseUrl + "/all")
}

export const getDevice = async (deviceId) => {
  return await axios.get(deviceBaseUrl + `/one/${deviceId}`)
}

export const getDeviceBrands = async () => {
  return await axios.get(deviceBaseUrl + `/brands`)
}

export const getLastNumberCode = async () => {
  return await axios.get(deviceBaseUrl + "/number_code")
}

export const addDevice = async (device) => {
  return await axios.post(deviceBaseUrl, {device})
}

export const getDeviceIds = async (quantity, numberCode ) => {
  return await axios.get(deviceBaseUrl + `/getid${quantity && "?quantity="+quantity}${numberCode && "&numberCode="+numberCode}`)
}

export const repairDevice = async (data) => {
  return await axios.post(deviceBaseUrl + "/repair", {...data, token:localStorage.getItem("token")})
}

export const updateStateRequest = async (deviceId) => {
  return await axios.put(deviceBaseUrl + "/update_state/" + deviceId)
}

export const getStadisticsRequest = async () => {
  return await axios.get(deviceBaseUrl + "/stadistics")
}