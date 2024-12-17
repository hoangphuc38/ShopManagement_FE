import axiosClient from "./axiosClient";

class NotificationAPI {
    getAll = (userID) => {
        const url = `notification/${userID}`;
        return axiosClient.get(url);
    }

    markRead = (notificationID) => {
        const url = `notification/${notificationID}`;
        return axiosClient.put(url);
    }
}

const notificationAPI = new NotificationAPI();
export default notificationAPI;