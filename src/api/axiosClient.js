import axios from 'axios';
import authAPI from './authAPI';

const axiosClient = axios.create({
    baseURL: 'https://localhost:7125/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    //Handle errors;
    const config = error?.config;

    console.log("check: ", error?.response?.status);

    if (error?.response?.status === 500 && !config?.sent) {
        config.sent = true;
        const refreshToken = localStorage.getItem("refreshToken");

        try {
            const result = authAPI.refresh(refreshToken);

            if (result?.data.newAccessToken) {
                config.headers = {
                    ...config.headers,
                    authorization: `Bearer ${result?.data.newAccessToken}`,
                };
            }

            return config;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    return Promise.reject(error);
})

export default axiosClient;