import axiosClient from "./axiosClient";

class NotificationAPI {
    getAll = (userID) => {
        const url = `notification/${userID}`;
        return axiosClient.get(url);
    }
}

const notificationAPI = new NotificationAPI();
export default notificationAPI;