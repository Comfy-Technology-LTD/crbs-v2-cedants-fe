import axios from "axios";
import { toast } from "react-toastify";
import { ErrorBag } from "../interfaces";

const apiInstance = axios.create({
  baseURL: 'http://localhost:8000/', //move this to env
  // timeout: 1000,
  headers: {
    'accept': 'application/json'
  }
});


apiInstance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem('__u_access_token')
  console.log(access_token);
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`
  }

  return config;
})


// Create errorBag Interface
export const errorHandler = (errorBag: ErrorBag) => {
  Object.entries(errorBag).map(([key, value]) => {
    value.map((error: string) => {
      toast.warn(`${key} ${error}`, {
        theme: 'colored'
      })
    })
  })
}


export default apiInstance;