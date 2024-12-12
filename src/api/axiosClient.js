import axios from 'axios';

let token = localStorage.getItem("token");

const axiosClient = axios.create({
    baseURL: 'https://localhost:7125/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    //Handle token here
    if (token && config.headers) {
        config.headers.Authorization = token;
        return config;
    }
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    //Handle errors;
    throw error;
})

export default axiosClient;