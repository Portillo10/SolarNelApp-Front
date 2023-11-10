import axios from "axios"

const baseUrl = "http://localhost:5000/device"

export const getAllDevices = async () => {
  return await axios.get(baseUrl + "/all")
}