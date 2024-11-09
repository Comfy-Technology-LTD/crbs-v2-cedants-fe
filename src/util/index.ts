import axios from "axios";

const apiInstance = axios.create({
  baseURL: 'http://localhost:8000/', //move this to env
  // timeout: 1000,
  headers: {
    'accept': 'application/json'
  }
});


export default apiInstance;