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
    console.log(error.message, 'First');
    (error as any).originalMessage = error.message;
    Object.defineProperty(error, "message", { get: function () {
        console.log(error.response, 'From object');
        if (!error.response) {
            return (error as any).originalMessage;
        }
        const message = {
            data: error.response?.data,
            status: error.response?.status
        }
        return message;
    }});

    console.log(error.message, 'Before promise');
    return Promise.reject(error.message);
  })

export default api;