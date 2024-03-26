import axios from "axios";


const URL = 'https://back.crafters.asia/api/v1'


export const api = axios.create({
  baseURL: URL,
});
export const apiToken = axios.create({
    baseURL: URL,
});

apiToken.interceptors.request.use(
  config => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers['Authorization'] = `Token ${token}`;
      }
      return config
  },
  error => {
      Promise.reject(error)
  }
)