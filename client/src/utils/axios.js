//Import axios
import axios from 'axios';

//creates basic axios call
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})