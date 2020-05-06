import axios, { AxiosError } from "axios";
import backendHost from '../constants/appConstants';

const api = axios.create({
    baseURL: backendHost,
    withCredentials: true
});

api.interceptors.response.use(undefined, function (error: AxiosError) {
    console.log(error);
    (error as any).originalMessage = error.message;
    Object.defineProperty(error, "message", { get: function () {
        if (!error.response) {
            return (error as any).originalMessage;
        }
        return JSON.stringify(error.response.data);
    }});
    return Promise.reject(error);
})

export default api;