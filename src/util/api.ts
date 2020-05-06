import axios, { AxiosError, AxiosResponse } from "axios";
import backendHost from '../constants/appConstants';

const api = axios.create({
    baseURL: backendHost,
    withCredentials: true
});

api.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;

  }, function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const res= error.response ? error.response : error.message;
    return Promise.reject(res);
  })

export default api;