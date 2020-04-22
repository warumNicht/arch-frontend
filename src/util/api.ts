import axios from "axios";
import backendHost from '../constants/appConstants';

const api = axios.create({
    baseURL: backendHost,
    withCredentials: true
});

export default api;