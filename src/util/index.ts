import axios from "axios";
import { toast } from "react-toastify";

const apiInstance = axios.create({
  baseURL: 'http://localhost:8000/', //move this to env
  // timeout: 1000,
  headers: {
    'accept': 'application/json'
  }
});

// Create errorBag Interface
export const errorHandler = (errorBag) => {
  Object.entries(errorBag).map(([key, value]) => {
    value.map((error: string) => {
      toast.warn(`${key} ${error}`, {
        theme: 'colored'
      })
    })
  })
}


export default apiInstance;