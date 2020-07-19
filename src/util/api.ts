import axios, { AxiosResponse } from "axios";
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

    const errorFromServer = error.response ? {
        status: error.response.status,
        data: error.response.data
    } : error.message;

    return Promise.reject(errorFromServer);
})

export default api;