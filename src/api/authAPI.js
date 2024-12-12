import axiosClient from "./axiosClient";

class AuthAPI {
    login = (email, password) => {
        const url = 'account/login';
        return axiosClient.post(url, { email, password });
    }

    logout = (userID) => {
        const url = `account/logout?userID=${userID}`;
        return axiosClient.post(url);
    }

    signup = (fullName, userName, password, address, role) => {
        const url = 'account/register';
        return axiosClient.post(url, { fullName, userName, password, address, role })
    }
}

const authAPI = new AuthAPI();
export default authAPI;